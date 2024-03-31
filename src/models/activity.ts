import { Association, DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, NonAttribute, HasOneCreateAssociationMixin, HasOneSetAssociationMixin, HasManyCreateAssociationMixin, BelongsToManyAddAssociationsMixin } from 'sequelize';
import Address from './address';
import Client from './client';
import Contact from './contact';
import sequelizeInstance from './sequlizeInstance';

class Activity extends Model<InferAttributes<Activity>, InferCreationAttributes<Activity>> {
    declare id: CreationOptional<string>;
    declare starting_date: Date;
    declare duration: Number;
    declare purpose: String;
    declare comment: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    declare addressId: ForeignKey<Address['id']>;
    declare clientId: ForeignKey<Client['id']>;

//    declare createAddress: HasManyCreateAssociationMixin<Address, 'clientId'>;
    declare createAddress: HasManyCreateAssociationMixin<Address>;
    declare setAddress: HasManySetAssociationsMixin<Address, Address["id"]>;

    declare setClient: HasOneSetAssociationMixin<Client, Client["id"]>;

    declare addContacts: BelongsToManyAddAssociationsMixin<Contact, Contact['id']>;
}

Activity.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    starting_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    purpose: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    }, 
    {
    tableName: 'activities',
    sequelize: sequelizeInstance,
});

export default Activity;