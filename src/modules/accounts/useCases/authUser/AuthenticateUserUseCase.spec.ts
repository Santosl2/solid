import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


let authUserUseCase: AuthenticateUserUseCase;
let createUsersUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUsersUseCase = new CreateUserUseCase(usersRepositoryInMemory);

    });

    it("should be able to auth an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000",
            email: "user@jest.com",
            password: "jest",
            name: "Jest"
        }

        await createUsersUseCase.execute(user);

        const result = await authUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to auth an non existent user", () => {
        expect(async () => {
            await authUserUseCase.execute({
                email: "false@markzuckerbeg.com",
                password: "122"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to auth with incorret password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "777",
                email: "jesus@lovesme.god",
                password: "jesusaves",
                name: "Im Loved by jesus"
            };

            await createUsersUseCase.execute(user);

            await authUserUseCase.execute({
                email: user.email,
                password: "jesusnotsave" // Oops, errou ein
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});