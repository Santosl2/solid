import { Request, Response } from "express";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";


class ListSpecificationController {
    constructor(private listSpecificationsUseCase: ListSpecificationUseCase) { }
    handle(request: Request, response: Response): Response {
        const listAllSpecifications = this.listSpecificationsUseCase.execute();

        return response.json({ listAllSpecifications });
    }

}

export { ListSpecificationController };