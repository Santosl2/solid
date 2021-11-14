import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";
import { resolve } from "path";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokensRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

        @inject("EtherealMailProvider")
        private etherealMailProvider: IMailProvider
    ) {

    }
    async execute(email: string) {

        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Usuário não existe.");
        }

        const templatePath = resolve(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
        const token = uuid();

        const variables = {
            name: user.name,
            link: `http://localhost:3333/password/reset?token=${token}`
        }

        const expires_date = this.dateProvider.add(3, "hour");

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        });

        await this.etherealMailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
        );
    }
}

export { SendForgotPasswordMailUseCase };