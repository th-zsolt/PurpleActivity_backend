import { Router } from "express";
import controller from '../controllers/address'
import { BadRequestError } from "../utils/error";

const router = Router()

router.route('/')
router.get('/', async (req, res, next) => {
    const messages = await controller.getAddresses()
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

router.put('/', async (req, res, next) => {
    const messages = await controller.updateAddress(req.body)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

router.get('/:clientId', async (req, res, next) => {
    const messages = await controller.getAddressById(req.body.clientId)
    .catch((error) => next(new BadRequestError(error)),);

    return res.send(messages);
    })

export default router;


