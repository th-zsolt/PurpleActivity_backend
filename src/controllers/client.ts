import { Address, Client, Contact, Activity } from "../models";
const { Op } = require("sequelize");
import { CustomError } from "../utils/error";

// GET Clients - all
const getClients = async (): Promise<Client[]> => {
    return await Client.findAll({
        include: [Address, Contact],
        order: [['name', 'ASC']],
    })
}

// GET Client by Id
const getClientById = async (clientId: Client["id"]): Promise<Client> => {
    const _client = await Client.findByPk(clientId, {
            include: [Address, Contact]
    })

    if(!_client) {
        throw new CustomError("Client not found");
    }
    return _client;
}

type SearchParams = {
    name?: string;
    VAT?: string;
    hasNoActivity?: boolean;
    city?: string;
  }

// GET Client, could filter by name, vat, address city, no activity
const getClientsWithFilters = async (searchParams: SearchParams): Promise<Client[]> => {
    var clientWhere: any = {};
    if(searchParams.hasNoActivity === true) {
         clientWhere = {'$Activities.id$': { [Op.is]: null }}
        }
    if(searchParams.name) clientWhere.name = searchParams.name;
    if(searchParams.VAT) clientWhere.VAT = searchParams.VAT;
    
    var addressWhere: SearchParams = {};
    if(searchParams.city) addressWhere.city = searchParams.city;

    const _client = await Client.findAll({
        where: clientWhere,
        include: [{
            model: Activity,
            as: 'Activities',
            attributes: [],
          },
          {
            model: Address,
            where: addressWhere
          }
        ],
        order: [['name', 'ASC']],
        })

    if(!_client) {
        throw new CustomError("Client not found");
    }
    return _client;

}

//GET Client's AddressId by ClientId
const getClientAddressId = async (clientId: Client["id"]): Promise<Client> => {
    const _client = await Client.findByPk(clientId)

    if(!_client) {
        throw new CustomError("Client not found");
    }
    return _client;
}

// POST Client with address
const createClient = async (client: any) => {
    let newClient = await Client.create({
        name: client.name,
        VAT: client.VAT,
    });

    await newClient.createAddress( client.address );
//    await newClient.createContact( client.contact );
}


//UPDATE Client
const updateClient = async (client: any) => {
    var clientParams: any = {};
    if(client.name) clientParams.name = client.name;
    if(client.VAT) clientParams.VAT = client.VAT;

    await Client.update( clientParams, {
        where: {
          id: client.clientId
        }
      });
}

export default {
    getClients: getClients,
    createClient: createClient,
    getClientById: getClientById,
    getClientAddressId: getClientAddressId,
    getClientsWithFilters: getClientsWithFilters,
    updateClient: updateClient
}

