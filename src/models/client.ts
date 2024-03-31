import { Association, DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, NonAttribute, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, BelongsToManyAddAssociationsMixin } from 'sequelize';
import Address from './address';
import Activity from './activity'
import Contact from './contact';
import sequelizeInstance from './sequlizeInstance';


class Client extends Model<InferAttributes<Client>, InferCreationAttributes<Client>> {
        declare id: CreationOptional<string>;
        declare name: string;
        declare VAT: string;
        declare createdAt: CreationOptional<Date>;
        declare updatedAt: CreationOptional<Date>;

/*      declare addressId: ForeignKey<Address['id']>; */

/*      declare getAddresses: HasManyGetAssociationsMixin<Address>; // Note the null assertions!
        declare addAddress: HasManyAddAssociationMixin<Address, number>;
        declare addAddresses: HasManyAddAssociationsMixin<Address, number>;
        declare setAddresses: HasManySetAssociationsMixin<Address, number>;
        declare removeAddress: HasManyRemoveAssociationMixin<Address, number>;
        declare removeAddresses: HasManyRemoveAssociationsMixin<Address, number>;
        declare hasAddress: HasManyHasAssociationMixin<Address, number>;
        declare hasAddresses: HasManyHasAssociationsMixin<Address, number>;
        declare countAddresss: HasManyCountAssociationsMixin;
        declare createAddress: HasManyCreateAssociationMixin<Address, 'clientId'>; 
*/
        declare createAddress: HasOneCreateAssociationMixin<Address>;
        declare getAddress: HasOneGetAssociationMixin<Address>;
        declare getActivities: HasManyGetAssociationsMixin<Activity>;

        declare createContact: HasManyCreateAssociationMixin<Contact>;
        declare getContacts: HasManyGetAssociationsMixin<Contact>;
}  

Client.init(
        {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        VAT: {
            type: DataTypes.STRING,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, 
    {
        tableName: 'clients',
        sequelize: sequelizeInstance,
    }
);

export default Client;