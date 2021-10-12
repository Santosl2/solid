import { request, Router } from 'express';
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRouter = Router();
const specificationsRepository = new SpecificationsRepository();

specificationRouter.post("/", (request, response) => {
    const { name, description } = request.body;

    const createSpecificationService = new CreateSpecificationService(specificationsRepository);

    createSpecificationService.execute({ name, description });

    return response.status(201).send();

});

specificationRouter.get("/", (request, response) => {
    const listAllSpecifications = specificationsRepository.list();

    return response.json({ listAllSpecifications });
});

export { specificationRouter };