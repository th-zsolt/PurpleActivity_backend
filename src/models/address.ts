import { Association, DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
//import Address from './address';
import sequelizeInstance from './sequlizeInstance';
import { Client } from "./index";

class Address extends Model<InferAttributes<Address>, InferCreationAttributes<Address>> {
    declare id: CreationOptional<string>;
    declare state: String;
    declare city: String;
    declare street: String;
    declare zip: Number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

/*     declare clientId: ForeignKey<Client['id']>; */
}
/* Address.belongsTo(Client, {targetKey: 'id'}) */

Address.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    zip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
},
{
    tableName: 'addresses',
    sequelize: sequelizeInstance,
}
)


export default Address;