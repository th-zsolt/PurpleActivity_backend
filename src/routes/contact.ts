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

/* router.put('/', async (req, res, next) => {
    const messages = await controller.updateContacts(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
}) */

    router.put('/', async (req, res, next) => {
        try {
            const messages = await controller.updateContacts(req.body);
            return res.send(messages);
        } catch (error) {
            if (error instanceof Error) {
                next(new BadRequestError(error.message));
            } else {
                next(new BadRequestError('An unknown error occurred'));
            }
        }
    });


router.get('/:contactId', async (req, res, next) => {
    const messages = await controller.getContactById(req.params.contactId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

/* router.get('/:clientId', async (req, res, next) => {
    const messages = await controller.getContactById(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    }) */

export default router;