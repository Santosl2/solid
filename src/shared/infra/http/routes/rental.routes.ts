import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";

const rentalRoutes = Router();

let createRentalController = new CreateRentalController();
let devolutionController = new DevolutionRentalController();
let listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/",
    ensureAuthenticated,
    createRentalController.handle
);

rentalRoutes.post("/devolution/:id",
    ensureAuthenticated,
    devolutionController.handle
);

rentalRoutes.get("/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalRoutes };