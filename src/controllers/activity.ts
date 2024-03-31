import { Console } from "console";
import { Activity, Address, Client, Contact } from "../models";
import getClientAddressId from "./client"
import { Optional, InferCreationAttributes } from "sequelize";
import { CustomError } from "../utils/error";

// GET Activities - all
const getActivities = async (): Promise<Activity[]> => {
    return await Activity.findAll({
        include: [Address, Client, Contact],
        order: [['id', 'ASC']],
    })
}

//GET Client's Activities
const getActivitiesByClient = async (clientId: Client["id"]): Promise<Activity[]> => {
    const _activities = await Activity.findAll({
        where: {
            clientId: clientId
        }
    })

    if (!_activities) {
        throw new CustomError("Activity not found");
    }
    return _activities;
}


//GET Addresses used for client activity
const getAddressesUsedbyClient = async (clientId: Client["id"]): Promise<Activity[]> => {
    const _activities = await Activity.findAll({
        attributes: [],
        where: {
            clientId: clientId
         },
        include: {
            model: Address,
            required: true,
        },
        group: ['Address.id'],
        raw: true,
    })

    if (!_activities) {
        throw new CustomError("Activity not found");
    }
    return _activities;
}


// POST Activity
const createActivity = async (activity: any) => {

    let newActivity = await Activity.create({
        starting_date: activity.startingDate,
        duration: activity.duration,
        purpose: activity.purpose,
        comment: activity.comment
    });

    //Should provide addressObj or addressId or it will use the Client's address
    if (activity.address) {
        await newActivity.createAddress( activity.address );
    } else if (activity.addressId) {
        await newActivity.setAddress( activity.addressId );
    } else {
        await getClientAddressId.getClientAddressId(activity.clientId).then((_clientAddressId: any) => {
            if (_clientAddressId !== "Client not found") {
                newActivity.setAddress( _clientAddressId );
            }
        });

    };

    await newActivity.setClient(activity.clientId);
}

//ADD existing contacts to Activity
const addContactsToActivity = async (params: any) => {

    const _activity = await Activity.findByPk(params.activityId);

    if(_activity) {
        params.contactIds.forEach(async (element: any) => {
        _activity.addContacts(element)
        }
    )}
}


//UPDATE Activity
const updateActivity = async (activity: any) => {
    var activityParams: any = {};
    if(activity.starting_date) activityParams.starting_date = activity.starting_date;
    if(activity.duration) activityParams.duration = activity.duration;
    if(activity.purpose) activityParams.purpose = activity.purpose;
    if(activity.comment) activityParams.comment = activity.comment;

    await Activity.update( activityParams, {
        where: {
          id: activity.activityId
        }
      });
}

export default {
    getActivities: getActivities,
    createActivity: createActivity,
    getActivitiesByClient: getActivitiesByClient,
    getAddressesUsedbyClient: getAddressesUsedbyClient,
    updateActivity: updateActivity,
    addContactsToActivity: addContactsToActivity
}