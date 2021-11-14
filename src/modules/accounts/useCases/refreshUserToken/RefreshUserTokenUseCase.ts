import Auth from "@config/Auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { AppError } from "@shared/errors/AppError";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";


interface IPayload {
    sub: string;
    email: string;

}

@injectable()
class RefreshUserTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokensRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }


    async execute(token: string): Promise<string> {
        const { email, sub } = verify(token, Auth.secret_refresh_token) as IPayload;
        const user_id = sub;

        const userTokens = await this.usersTokensRepository
            .findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userTokens) {
            throw new AppError("Refresh Token não existe.");
        }

        await this.usersTokensRepository.deleteById(userTokens.id);

        const refresh_token = sign({ email }, Auth.secret_refresh_token, {
            subject: user_id,
            expiresIn: Auth.expires_in_refresh_token
        });

        const expires_date = this.dateProvider.add(Auth.expires_refresh_days);


        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id
        });

        return refresh_token;

    }

}

export { RefreshUserTokenUseCase };