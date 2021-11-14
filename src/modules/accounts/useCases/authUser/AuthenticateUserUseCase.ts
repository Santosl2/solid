import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import Auth from "@config/Auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,

        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email ou senha incorreta.");
        }

        const passwordEquals = await compare(password, user.password);

        if (!passwordEquals) {
            throw new AppError("Email ou senha incorreta.");
        }

        const { expires_in_token,
            secret_refresh_token,
            secret_token,
            expires_in_refresh_token,
            expires_refresh_days
        } = Auth;

        const token = sign({
        }, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const expires_date = this.dateProvider.add(expires_refresh_days);



        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token
        });

        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date

        })

        const tokenReturn: IResponse = {
            token,
            refresh_token,
            user: {
                name: user.name,
                email: user.email
            }
        };

        return tokenReturn;

    }

}

export { AuthenticateUserUseCase };