import { Association, DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, NonAttribute, HasOneCreateAssociationMixin, HasOneSetAssociationMixin, HasManyCreateAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToSetAssociationMixin } from 'sequelize';
import sequelizeInstance from './sequlizeInstance';
import Activity from './activity';
import Client from './client';

class Contact extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>> {
    declare id: CreationOptional<string>;
    declare name: String;
    declare title: String;
    declare phone: String;
    declare email: String;

    declare addActivity: BelongsToManyAddAssociationsMixin<Activity, Activity['id']>;
    declare setClient: BelongsToSetAssociationMixin<Client, Client['id']>
}

Contact.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    tableName: 'contacts',
    sequelize: sequelizeInstance,
});

export default Contact;