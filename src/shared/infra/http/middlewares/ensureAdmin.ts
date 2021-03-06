import { UsersRepository } from "@modules/accounts/infra/typeorm/respositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";


export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const { id } = request.user;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
        throw new AppError("Users isn't admin!");
    }

    return next();
}