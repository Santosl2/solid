import { AuthenticateUserController } from "@modules/accounts/useCases/authUser/AuthenticateUserController";
import { RefreshUserTokenController } from "@modules/accounts/useCases/refreshUserToken/RefreshUserTokenController";
import { Router } from "express";

const authRoute = Router();

const authController = new AuthenticateUserController();
const refreshTokenController = new RefreshUserTokenController();


authRoute.post("/sessions", authController.handle);
authRoute.post("/refresh-token", refreshTokenController.handle);

export { authRoute };