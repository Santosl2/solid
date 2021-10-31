import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";


const carRoutes = Router();

let createCategoryController = new CreateCarController();

carRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle);

export { carRoutes };