import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";


interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("Token inválido.");
    }

    const [, token] = authHeader.split(" ");

    try {
        // Forçar que ele tera um retorno de IPayload
        // desestruturação e transforma o sub em id
        const { sub: id } = verify(token, "e73793e0a6cc4cb18f6f6462bcf5fd17") as IPayload;


        const usersRepository = new UsersRepository();
        const userExists = await usersRepository.findById(id);

        if (!userExists) {
            throw new Error("User inválido.");
        }

        next();
    }
    catch {
        throw new Error("Token inválido.");
    }

}