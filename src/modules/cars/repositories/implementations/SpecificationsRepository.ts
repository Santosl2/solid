import { Specification } from "@modules/cars/entities/Specification";
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Repository<Specification>;

    constructor() {
        this.specifications = getRepository(Specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specifications.findOne({ name })

        return specification;
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.specifications.create({
            name,
            description
        })

        await this.specifications.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.specifications.find();

        return specifications;
    }
}


export { SpecificationsRepository };