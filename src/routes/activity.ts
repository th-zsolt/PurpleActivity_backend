import { Router } from "express";
import controller from '../controllers/activity';
import { BadRequestError } from "../utils/error";

const router = Router()


router.get('/', async (req, res, next) => {
    const messages = await controller.getActivities()
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/', async (req, res, next) => {
    try {
        const createdActivity = await controller.createActivity(req.body);
        return res.status(201).send(createdActivity);
    } catch (error) {
        // Ensure error is a string or has a message property
        const message = error instanceof Error ? error.message : String(error);
        return next(new BadRequestError(message));
    }
});

router.put('/', async (req, res, next) => {
    try {
        const updatedActivity = await controller.updateActivity(req.body);
        return res.send(updatedActivity);
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return next(new BadRequestError(message));
    }
});



router.get('/:clientId', async (req, res, next) => { 
    const messages = await controller.getActivitiesByClient(req.params.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/:clientId', async (req, res, next) => {
    const messages = await controller.getAddressesUsedByClient(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/:clientId/contacts', async (req, res, next) => {
    const messages = await controller.addContactsToActivity(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
});

router.get('/activity/:id', async (req, res, next) => { 
    const activity = await controller.getActivityById(req.params.id)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(activity);
});

export default router;