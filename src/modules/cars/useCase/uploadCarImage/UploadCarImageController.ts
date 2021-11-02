import { container } from "tsyringe";
import { Request, Response } from "express";
import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImageController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: car_id } = request.params;
        const images = request.files as IFiles[];

        const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

        const images_name = images.map(file => file.filename);

        await uploadCarImageUseCase.execute({ car_id, images_name });

        return response.status(201).send();
    }
}

export { UploadCarImageController };