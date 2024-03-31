import { Router } from "express";
import controller from '../controllers/client'
import { BadRequestError } from "../utils/error";

const router = Router()

router.get('/', async (req, res, next) => {
    const messages = await controller.getClients()
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/', async (req, res, next) => {
    const messages = await controller.createClient(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
});

router.put('/', async (req, res, next) => {
    const messages = await controller.updateClient(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
});

router.get('/:clientId', async (req, res, next) => {
    const messages = await controller.getClientById(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
});

router.get('/filters/:filters', async (req, res, next) => {
    const messages = await controller.getClientsWithFilters(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})


export default router;

