import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/respositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/respositories/UsersTokensRepository";
import Auth from "@config/Auth";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    const usersTokenRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token inválido.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        // Forçar que ele ter um retorno de IPayload
        // desestruturação e transforma o sub em id
        const { sub: id } = verify(token, Auth.secret_refresh_token) as IPayload;


        //const usersRepository = new UsersRepository();
        const userExists = await usersTokenRepository
            .findByUserIdAndRefreshToken(id, token);

        if (!userExists) {
            throw new AppError("User inválido.", 401);
        }

        request.user = {
            id
        }

        next();
    }
    catch {
        throw new AppError("Token inválido.", 401);
    }

}