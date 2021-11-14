import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) {

    }
    async execute(email: string) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Usuário não existe.");
        }

        const token = uuid();

        const expires_date = this.dateProvider.add(3, "hour");

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });

    }
}

export { SendForgotPasswordMailUseCase };