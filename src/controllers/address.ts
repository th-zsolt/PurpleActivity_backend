import { Address } from "../models";
import { CustomError } from "../utils/error";

// GET Addresses - all
const getAddresses = async (): Promise<Address[]> => {
    return await Address.findAll({
        order: [['id', "ASC"]],
    })
}

// GET Address by Id
const getAddressById = async (addressId: Address["id"]): Promise<Address> => {
    const _address = await Address.findByPk(addressId)
    if (!_address) {
        throw new CustomError("Address not found");
    }
    return _address;
}

//UPDATE Address
const updateAddress = async (address: any) => {
    var addressParams: any = {};
    if(address.state) addressParams.state = address.state;
    if(address.city) addressParams.city = address.city;
    if(address.street) addressParams.street = address.street;
    if(address.zip) addressParams.zip = address.zip;

    await Address.update( addressParams, {
        where: {
          id: address.addressId
        }
      });
}


export default {
    getAddresses: getAddresses,
    getAddressById: getAddressById,
    updateAddress: updateAddress
}