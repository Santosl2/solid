import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";
import { Router } from "express";

const passRoutes = Router();


passRoutes.post("/forgot", new SendForgotPasswordMailController().handle);

export { passRoutes };