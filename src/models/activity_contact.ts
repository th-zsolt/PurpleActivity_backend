import { Association, DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, NonAttribute, HasOneCreateAssociationMixin, HasOneSetAssociationMixin, HasManyCreateAssociationMixin } from 'sequelize';
import sequelizeInstance from './sequlizeInstance';

class Activity_Contacts extends Model<InferAttributes<Activity_Contacts>, InferCreationAttributes<Activity_Contacts>> {
    declare activityId: string;
    declare contactId: string;
}


Activity_Contacts.init({
    activityId: DataTypes.UUID,
    contactId: DataTypes.UUID,
    }, 
    {
    tableName: 'activity_contacts',
    sequelize: sequelizeInstance,
});

export default Activity_Contacts;