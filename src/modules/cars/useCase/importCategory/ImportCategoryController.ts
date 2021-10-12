import { Request, Response } from 'express';
import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }
    handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoryUseCase.execute(file);
        /*const extensions = ['image/png', 'image/jpeg', 'image/jpg'];

        if (extensions.indexOf(file.mimetype) == -1) {
            console.log("ue");
        }

        console.log(file);*/
        return response.send();
    }
}

export { ImportCategoryController };