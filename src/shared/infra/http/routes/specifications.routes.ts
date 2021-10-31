import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCase/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCase/listSpecification/ListSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticate';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';

const specificationRouter = Router();


const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();


specificationRouter.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createSpecificationController.handle
);

specificationRouter.get("/", listSpecificationController.handle);

export { specificationRouter };