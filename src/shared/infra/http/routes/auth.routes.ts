import { AuthenticateUserController } from "@modules/accounts/useCases/authUser/AuthenticateUserController";
import { Router } from "express";

const authRoute = Router();

const authController = new AuthenticateUserController();


authRoute.post("/sessions", authController.handle);

export { authRoute };