import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest) {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email ou senha incorreta.");
        }

        const passwordEquals = await compare(password, user.password);

        if (!passwordEquals) {
            throw new Error("Email ou senha incorreta.");
        }


    }

}

export { AuthenticateUserUseCase };