import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";


const carRoutes = Router();

let createCategoryController = new CreateCarController();
let listCars = new ListCarsController();

carRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle);

carRoutes.get("/available", listCars.handle);

export { carRoutes };