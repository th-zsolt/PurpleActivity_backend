import { Router } from "express";

import clientRoutes from './client';
import activityRoutes from "./activity";
import addressRoutes from './address';
import contactRoutes from './contact';

const routes = Router()

routes.use('/clients', clientRoutes)
routes.use('/activities', activityRoutes)
routes.use('/addresses', addressRoutes)
routes.use('/contacts', contactRoutes)

export default routes;



