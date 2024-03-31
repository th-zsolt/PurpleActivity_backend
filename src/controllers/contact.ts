import { Contact, Client, Activity_Contacts } from "../models";
import { CustomError } from "../utils/error";

// GET Contacts - all
const getContacts = async (): Promise<Contact[]> => {
    return await Contact.findAll({
        order: [['id', "ASC"]],
    })
}

// GET Contact by Id
const getContactById = async (contactId: Contact["id"]): Promise<Contact> => {
    const _contact = await Contact.findByPk(contactId)

    if(!_contact) {
        throw new CustomError("Contact not found");
    }
    return _contact;
}

//POST Contact
const createContacts = async (contacts: [any]) => {

    contacts.forEach(async element => {
        let newContact = await Contact.create(element);
        newContact.addActivity(element.activityId);
        newContact.setClient(element.clientId);
    });
}

//UPDATE Contact
const updateContact = async (contact: any) => {
    var contactParams: any = {};
    if(contact.name) contactParams.name = contact.name;
    if(contact.title) contactParams.title = contact.title;
    if(contact.phone) contactParams.phone = contact.phone;
    if(contact.email) contactParams.email = contact.email;

    await Contact.update( contactParams, {
        where: {
          id: contact.contactId
        },
      });
}


export default {
    getContacts: getContacts,
    getContactById: getContactById,
    createContacts: createContacts,
    updateContact: updateContact
}