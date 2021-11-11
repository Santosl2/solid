import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

let createRentalController = new CreateRentalController();


rentalRoutes.post("/",
    ensureAuthenticated,
    createRentalController.handle
);

export { rentalRoutes };