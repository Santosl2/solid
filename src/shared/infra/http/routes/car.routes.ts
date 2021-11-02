import multer from "multer";
import uploadConfig from "@config/Upload";
import { CreateCarController } from "@modules/cars/useCase/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCase/createCarSpecification/CreateCarSpecificationController";
import { ListCarsController } from "@modules/cars/useCase/listCars/ListCarsController";
import { UploadCarImageController } from "@modules/cars/useCase/uploadCarImage/UploadCarImageController";
import { Router } from "express";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticate";


const carRoutes = Router();

let createCategoryController = new CreateCarController();
let listCars = new ListCarsController();
let createCarSpecificationController = new CreateCarSpecificationController();
let uploadCarImage = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCategoryController.handle
);

carRoutes.get("/available", listCars.handle);

carRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carRoutes.post("/images/:id",
    ensureAuthenticated,
    ensureAdmin,
    upload.array("image"),
    uploadCarImage.handle
);

export { carRoutes };