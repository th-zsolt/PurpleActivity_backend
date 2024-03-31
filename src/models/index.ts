import Client from "./client";
import Address from "./address"; 
import Activity from "./activity";
import Contact from "./contact";
import Activity_Contacts from "./activity_contact";

Address.hasOne(Client, {
    foreignKey:'addressId'
});
Client.belongsTo(Address, {
    foreignKey:'addressId'
});


Address.hasMany(Activity, {
    foreignKey:'addressId'
});
Activity.belongsTo(Address, {
    foreignKey:'addressId'
});


Client.hasMany(Activity, {
    foreignKey:'clientId'
});
Activity.belongsTo(Client, {
    foreignKey:'clientId'
});


Client.hasMany(Contact, {
    foreignKey:'clientId'
});
Contact.belongsTo(Client, {
    foreignKey:'clientId'
});


Activity.belongsToMany(Contact, {
    through: 'activity_contacts',
    foreignKey: 'activityId', 
    otherKey: 'contactId' 
  });
Contact.belongsToMany(Activity, {
    through: 'activity_contacts',
    foreignKey: 'contactId', 
    otherKey: 'activityId' 
  });


export { Client, Address, Activity, Contact, Activity_Contacts };
