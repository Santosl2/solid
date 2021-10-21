import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

// SRP

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {

    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Categoria já existente.");
        }

        this.categoriesRepository.create({ name, description });

    }
}

export { CreateCategoryUseCase };