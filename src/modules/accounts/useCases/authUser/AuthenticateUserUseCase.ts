import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error("Email ou senha incorreta.");
        }

        const passwordEquals = await compare(password, user.password);

        if (!passwordEquals) {
            throw new Error("Email ou senha incorreta.");
        }

        const token = sign({
        }, "e73793e0a6cc4cb18f6f6462bcf5fd17", {
            subject: user.id,
            expiresIn: "1d"
        });


        return { user, token };

    }

}

export { AuthenticateUserUseCase };