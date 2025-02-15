// Associations setup file (e.g., models/index.js or associations.js)
import Client from "./client";
import Address from "./address"; 
import Activity from "./activity";
import Contact from "./contact";
import Activity_Contacts from "./activity_contact";

// Address <-> Client
Address.hasOne(Client, {
    foreignKey: 'addressId',
    as: 'client'
});
Client.belongsTo(Address, {
    foreignKey: 'addressId',
    as: 'address'
});

// Address <-> Activity
Address.hasMany(Activity, {
    foreignKey: 'addressId',
    as: 'activities'
});
Activity.belongsTo(Address, {
    foreignKey: 'addressId',
    as: 'address'
});

// Client <-> Activity
Client.hasMany(Activity, {
    foreignKey: 'clientId',
    as: 'activities'
});
Activity.belongsTo(Client, {
    foreignKey: 'clientId',
    as: 'client'
});

// Client <-> Contact
Client.hasMany(Contact, {
    foreignKey: 'clientId',
    as: 'contacts'
});
Contact.belongsTo(Client, {
    foreignKey: 'clientId',
    as: 'client'
});

// Activity <-> Contact (Many-to-Many)
Activity.belongsToMany(Contact, {
    through: Activity_Contacts,
    foreignKey: 'activityId', 
    otherKey: 'contactId',
    as: 'contacts'
});
Contact.belongsToMany(Activity, {
    through: Activity_Contacts,
    foreignKey: 'contactId', 
    otherKey: 'activityId',
    as: 'activities'
});

export { Client, Address, Activity, Contact, Activity_Contacts };
