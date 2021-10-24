import { Router } from "express";
import { AuthenticateUserController } from "../modules/accounts/useCases/authUser/AuthenticateUserController";

const authRoute = Router();

const authController = new AuthenticateUserController();


authRoute.post("/sessions", authController.handle);

export { authRoute };