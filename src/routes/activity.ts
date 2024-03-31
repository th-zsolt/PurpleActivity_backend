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
    const messages = await controller.createActivity(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.put('/', async (req, res, next) => {
    const messages = await controller.updateActivity(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/:clientId', async (req, res, next) => { 
    const messages = await controller.getActivitiesByClient(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/:clientId', async (req, res, next) => {
    const messages = await controller.getAddressesUsedbyClient(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/:clientId', async (req, res, next) => {
    const messages = await controller.addContactsToActivity(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

export default router;