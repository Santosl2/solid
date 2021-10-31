import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { Router } from "express";


const carRoutes = Router();

let createCategoryController = new CreateCarController();

carRoutes.post("/", createCategoryController.handle);

export { carRoutes };