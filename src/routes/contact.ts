import { Router } from "express";
import controller from '../controllers/contact'
import { BadRequestError } from "../utils/error";

const router = Router()

router.get('/', async (req, res, next) => {
    const messages = await controller.getContacts()
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.post('/', async (req, res, next) => {
    const messages = await controller.createContacts(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.put('/', async (req, res, next) => {
    const messages = await controller.updateContact(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
})

router.get('/:contactId/contact', async (req, res, next) => {
    const messages = await controller.getContactById(req.body.contactId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

router.get('/:clientId', async (req, res, next) => {
    const messages = await controller.getContactById(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

export default router;