import { Activity, Address, Client, Contact } from "../models";
import getClientAddressId from "./client";
import { CustomError } from "../utils/error";

// GET Activities - all
const getActivities = async (): Promise<Activity[]> => {
    return await Activity.findAll({
        include: [
            { model: Address, as: "address" },
            { model: Client, as: "client" },
            { model: Contact, as: "contacts" }
        ],
        order: [["id", "ASC"]],
    });
};

// GET Client's Activities
const getActivitiesByClient = async (clientId: Client["id"]): Promise<Activity[]> => {
    const _activities = await Activity.findAll({
        where: {
            clientId: clientId
        },
        include: [
            { model: Address, as: "address" }
        ]
    });

    if (!_activities) {
        throw new CustomError("Activity not found");
    }
    return _activities;
};

// GET Activity by ID
const getActivityById = async (activityId: Activity["id"]): Promise<Activity> => {
    const _activity = await Activity.findByPk(activityId, {
        include: [
            { model: Address, as: "address" },
            { model: Client, as: "client" },
            { model: Contact, as: "contacts" }
        ]
    });

    if (!_activity) {
        throw new CustomError("Activity not found");
    }

    return _activity;
};


// GET Addresses used for client activity
const getAddressesUsedByClient = async (clientId: Client["id"]): Promise<Activity[]> => {
    const _activities = await Activity.findAll({
        attributes: [],
        where: {
            clientId: clientId
        },
        include: {
            model: Address,
            as: "address",
            required: true,
        },
        group: ["address.id"],
        raw: true,
    });

    if (!_activities) {
        throw new CustomError("Activity not found");
    }
    return _activities;
};

// POST Activity
const createActivity = async (activity: any) => {
    try {
        const newActivity = await Activity.create({
            starting_date: activity.startingDate,
            duration: activity.duration,
            purpose: activity.purpose,
            comment: activity.comment,
        });

        if (activity.address) {
            await newActivity.createAddress(activity.address);
        } else if (activity.addressId) {
            await newActivity.setAddress(activity.addressId);
        } else {
            await getClientAddressId.getClientAddressId(activity.clientId).then((_clientAddressId: any) => {
                if (_clientAddressId !== "Client not found") {
                    newActivity.setAddress(_clientAddressId);
                }
            });
        }

        await newActivity.setClient(activity.clientId);

        return await Activity.findByPk(newActivity.id, {
            include: [
                { model: Address, as: "address" },
                { model: Client, as: "client" },
                { model: Contact, as: "contacts" },
            ],
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new CustomError(message);
    }
};


// ADD existing contacts to Activity
const addContactsToActivity = async (params: any) => {
    const _activity = await Activity.findByPk(params.activityId);

    if (_activity) {
        params.contactIds.forEach(async (element: any) => {
            _activity.addContacts(element);
        });
    }
};

// UPDATE Activity
const updateActivity = async (activity: any) => {
    try {
        const activityParams: any = {};
        if (activity.starting_date) activityParams.starting_date = activity.starting_date;
        if (activity.duration) activityParams.duration = activity.duration;
        if (activity.purpose) activityParams.purpose = activity.purpose;
        if (activity.comment) activityParams.comment = activity.comment;

        const _activity = await Activity.findByPk(activity.activityId);

        if (!_activity) {
            throw new CustomError("Activity not found");
        }

        await Activity.update(activityParams, {
            where: {
                id: activity.activityId,
            },
        });

        if (activity.address) {
            await _activity.createAddress(activity.address);
        } else if (activity.addressId) {
            await _activity.setAddress(activity.addressId);
        }

        if (activity.clientId) {
            await _activity.setClient(activity.clientId);
        }

        return await Activity.findByPk(activity.activityId, {
            include: [
                { model: Address, as: "address" },
                { model: Client, as: "client" },
                { model: Contact, as: "contacts" },
            ],
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new CustomError(message);
    }
};



export default {
    getActivities,
    createActivity,
    getActivitiesByClient,
    getAddressesUsedByClient,
    updateActivity,
    addContactsToActivity,
    getActivityById
};