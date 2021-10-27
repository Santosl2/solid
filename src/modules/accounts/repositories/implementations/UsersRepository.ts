import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }



    async create({ id, avatar, name, email, driver_license, password }: ICreateUserDTO): Promise<void> {
        const createUser = this.repository.create({
            id,
            avatar,
            name,
            email,
            driver_license,
            password
        });

        await this.repository.save(createUser);
    }

}

export { UsersRepository };