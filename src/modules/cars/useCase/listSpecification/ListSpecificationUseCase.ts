import { Specification } from "@modules/cars/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListSpecificationUseCase {

    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationsRepository) { }

    async execute(): Promise<Specification[]> {
        const allSpecifications = await this.specificationRepository.list();
        return allSpecifications;
    }
}

export { ListSpecificationUseCase };