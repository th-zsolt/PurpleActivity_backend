import { Address, Client, Contact, Activity } from "../models";
const { Op } = require("sequelize");
import { CustomError } from "../utils/error";

// GET Clients - all
const getClients = async (): Promise<Client[]> => {
    return await Client.findAll({
        include: [
            { model: Address, as: 'address' },
            { model: Contact, as: 'contacts' }
        ],
        order: [['name', 'ASC']],
    });
};

// GET Client by Id
const getClientById = async (clientId: Client["id"]): Promise<Client> => {
    const _client = await Client.findByPk(clientId, {
        include: [
            { model: Address, as: 'address' },
            { model: Contact, as: 'contacts' }
        ],
    });

    if (!_client) {
        throw new CustomError("Client not found");
    }
    return _client;
};

type SearchParams = {
    name?: string;
    VAT?: string;
    hasNoActivity?: boolean;
    city?: string;
};

// GET Client, could filter by name, VAT, address city, no activity
const getClientsWithFilters = async (searchParams: SearchParams): Promise<Client[]> => {
    const clientWhere: any = {};
    if (searchParams.hasNoActivity === true) {
        clientWhere['$activities.id$'] = { [Op.is]: null };
    }
    if (searchParams.name) clientWhere.name = searchParams.name;
    if (searchParams.VAT) clientWhere.VAT = searchParams.VAT;

    const addressWhere: SearchParams = {};
    if (searchParams.city) addressWhere.city = searchParams.city;

    const _client = await Client.findAll({
        where: clientWhere,
        include: [
            {
                model: Activity,
                as: 'activities',
                attributes: [],
            },
            {
                model: Address,
                as: 'address',
                where: addressWhere,
            },
        ],
        order: [['name', 'ASC']],
    });

    if (!_client) {
        throw new CustomError("Client not found");
    }
    return _client;
};

// GET Client's AddressId by ClientId
const getClientAddressId = async (clientId: Client["id"]): Promise<Client> => {
    const _client = await Client.findByPk(clientId);

    if (!_client) {
        throw new CustomError("Client not found");
    }
    return _client;
};

// POST Client with address
const createClient = async (client: any): Promise<Client> => {
    const newClient = await Client.create({
        name: client.name,
        VAT: client.VAT,
    });

    await newClient.createAddress(client.address);
    return newClient;
};

// UPDATE Client
const updateClient = async (data: any) => {
  // 1) Update the client itself
  await Client.update(
      { name: data.name, VAT: data.VAT },
      { where: { id: data.clientId } }
  );

  // 2) Fetch the client again (with its Address and Contacts)
  const client = await Client.findByPk(data.clientId, {
      include: [
          { model: Address, as: 'address' },
          { model: Contact, as: 'contacts' },
      ],
  });
  if (!client) {
      throw new Error("Client not found");
  }

  // 3) Update the associated address, if provided
  if (data.address) {
      const clientAddress = await client.getAddress();
      if (clientAddress) {
          await clientAddress.update({
              state: data.address.state,
              city: data.address.city,
              street: data.address.street,
              zip: data.address.zip,
          });
      }
  }

  return client;
};

export default {
    getClients,
    createClient,
    getClientById,
    getClientAddressId,
    getClientsWithFilters,
    updateClient,
};
