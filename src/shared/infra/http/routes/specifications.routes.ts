import { CreateSpecificationController } from '@modules/cars/useCase/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '@modules/cars/useCase/listSpecification/ListSpecificationController';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';

const specificationRouter = Router();


const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRouter.use(ensureAuthenticated);
specificationRouter.post("/", createSpecificationController.handle);

specificationRouter.get("/", listSpecificationController.handle);

export { specificationRouter };