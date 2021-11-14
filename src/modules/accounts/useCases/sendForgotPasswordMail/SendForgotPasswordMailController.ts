import { container } from "tsyringe";
import { Request, Response } from "express";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgotPassUseCase = container.resolve(
            SendForgotPasswordMailUseCase
        );

        await sendForgotPassUseCase.execute(email);
        return response.send();

    }
}

export { SendForgotPasswordMailController };