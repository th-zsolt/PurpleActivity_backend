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