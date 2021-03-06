
import { Router } from "express";
import { authRoute } from "./auth.routes";
import { carRoutes } from "./car.routes";
import { categoriesRoutes } from './categories.routes';
import { passRoutes } from "./password.router";
import { rentalRoutes } from "./rental.routes";
import { specificationRouter } from './specifications.routes';
import { userRoutes } from "./users.routes";

const router = Router();

router.get("/", (request, response) => {
    response.send();
})
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/account", userRoutes);
router.use("/cars", carRoutes);
router.use("/rental", rentalRoutes);
router.use("/", passRoutes);
router.use(authRoute);

export { router };