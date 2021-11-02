import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";


const carRoutes = Router();

let createCategoryController = new CreateCarController();
let listCars = new ListCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();

carRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

carRoutes.get("/available", listCars.handle);
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzU3Mjk4NTEsImV4cCI6MTYzNTgxNjI1MSwic3ViIjoiNmVjNjkzMjQtZTYzYy00MzA4LWIyOGMtMGVlNGRlZjdmMjdhIn0.mJA0qvd-2THLS308BU1nEE_VAKe_IOd05zVmhgCx7Xw
carRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

export { carRoutes };