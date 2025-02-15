import { Contact, Client, Activity_Contacts, Activity } from "../models";
import { CustomError } from "../utils/error";

// GET Contacts - all
const getContacts = async (): Promise<Contact[]> => {
    return await Contact.findAll({
        order: [["id", "ASC"]],
        include: [
            {
                model: Client,
                as: "client"
            },
            {
                model: Activity,
                as: "activities"
            }
        ]
    });
};

// GET Contact by Id
const getContactById = async (contactId: Contact["id"]): Promise<Contact> => {
    const _contact = await Contact.findByPk(contactId, {
        include: [
            {
                model: Client,
                as: "client"
            },
            {
                model: Activity,
                as: "activities"
            }
        ]
    });

    if (!_contact) {
        throw new CustomError("Contact not found");
    }
    return _contact;
};

// POST Contact
const createContacts = async (contacts: [any]) => {
    const createPromises = contacts.map(async (element) => {
        const newContact = await Contact.create(element);
        if (element.activityId) {
            await newContact.addActivity(element.activityId);
        }
        if (element.clientId) {
            await newContact.setClient(element.clientId);
        }
    });

    await Promise.all(createPromises);
};

// UPDATE Contact
const updateContacts = async (contacts: [any]) => {
    try {
        const updatePromises = contacts.map(async (contact) => {
            const { contactId, name, title, phone, email } = contact;
            const updateFields: any = {};

            if (name) updateFields.name = name;
            if (title) updateFields.title = title;
            if (phone) updateFields.phone = phone;
            if (email) updateFields.email = email;

            return Contact.update(updateFields, {
                where: { id: contactId }
            });
        });

        await Promise.all(updatePromises);

        return { message: "Contacts updated successfully" };
    } catch (error: any) {
        throw new CustomError(`Failed to update contacts: ${error.message}`);
    }
};

export default {
    getContacts,
    getContactById,
    createContacts,
    updateContacts
};
