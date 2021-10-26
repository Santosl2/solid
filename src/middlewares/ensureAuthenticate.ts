import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";
import { AppError } from "../errors/AppError";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token inválido.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        // Forçar que ele ter um retorno de IPayload
        // desestruturação e transforma o sub em id
        const { sub: id } = verify(token, "e73793e0a6cc4cb18f6f6462bcf5fd17") as IPayload;


        const usersRepository = new UsersRepository();
        const userExists = await usersRepository.findById(id);

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