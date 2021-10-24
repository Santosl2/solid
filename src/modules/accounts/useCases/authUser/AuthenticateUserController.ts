import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        const authUseCase = container.resolve(AuthenticateUserUseCase);

        const authInfo = await authUseCase.execute({ password, email });

        return response.json(authInfo);
    }
}

export { AuthenticateUserController };