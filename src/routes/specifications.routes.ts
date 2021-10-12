import { Router } from 'express';
import { createSpecificationController } from '../modules/cars/useCase/createSpecification';
import { listSpecificationController } from '../modules/cars/useCase/listSpecification';

const specificationRouter = Router();

specificationRouter.post("/", (request, response) => {
    return createSpecificationController.handle(request, response);
});

specificationRouter.get("/", (request, response) => {
    return listSpecificationController.handle(request, response);
});

export { specificationRouter };