import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/useCase/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../modules/cars/useCase/listSpecification/ListSpecificationController';

const specificationRouter = Router();


const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationController();

specificationRouter.post("/", createSpecificationController.handle);

specificationRouter.get("/", listSpecificationController.handle);

export { specificationRouter };