import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";


class ListSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecificationsUseCase = container.resolve(ListSpecificationUseCase);

        const listAllSpecifications = await listSpecificationsUseCase.execute();

        return response.json({ listAllSpecifications });
    }

}

export { ListSpecificationController };