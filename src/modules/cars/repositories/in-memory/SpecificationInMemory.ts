import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {

    specification: Specification[] = [];

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specifications = new Specification();

        Object.assign(specifications, {
            description,
            name
        });

        this.specification.push(specifications);
        return specifications;
    }

    async list(): Promise<Specification[]> {
        return this.specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specification.find((spec) => spec.name === name);
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specification.filter(
            (spec) => ids.includes(spec.id));

        return allSpecifications;
    }
}

export { SpecificationRepositoryInMemory };