import { Address, Client, Activity } from "../models";
import { CustomError } from "../utils/error";

// GET Addresses - all
const getAddresses = async (): Promise<Address[]> => {
    return await Address.findAll({
        include: [
            { model: Client, as: 'client' },
            { model: Activity, as: 'activities' }
        ],
        order: [["id", "ASC"]],
    });
};

// GET Address by Id
const getAddressById = async (addressId: Address["id"]): Promise<Address> => {
    const _address = await Address.findByPk(addressId, {
        include: [
            { model: Client, as: 'client' },
            { model: Activity, as: 'activities' }
        ]
    });

    if (!_address) {
        throw new CustomError("Address not found");
    }
    return _address;
};

// UPDATE Address
const updateAddress = async (address: any) => {
    const addressParams: any = {};
    if (address.state) addressParams.state = address.state;
    if (address.city) addressParams.city = address.city;
    if (address.street) addressParams.street = address.street;
    if (address.zip) addressParams.zip = address.zip;

    await Address.update(addressParams, {
        where: {
            id: address.addressId,
        },
    });
};

export default {
    getAddresses,
    getAddressById,
    updateAddress,
};
