import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";


class ListSpecificationController {

    handle(request: Request, response: Response): Response {
        const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase);

        const listAllSpecifications = listSpecificationsUseCase.execute();

        return response.json({ listAllSpecifications });
    }

}

export { ListSpecificationController };