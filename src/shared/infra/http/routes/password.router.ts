import { ResetPasswordController } from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passRoutes = Router();


passRoutes.post("/forgot", new SendForgotPasswordMailController().handle);
passRoutes.post("/reset", new ResetPasswordController().handle);

export { passRoutes };