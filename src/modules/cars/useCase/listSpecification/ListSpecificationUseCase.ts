import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationUseCase {

    constructor(private specificationRepository: ISpecificationsRepository) { }

    execute(): Specification[] {
        const allSpecifications = this.specificationRepository.list();
        return allSpecifications;
    }
}

export { ListSpecificationUseCase };