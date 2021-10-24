
import { Router } from "express";
import { categoriesRoutes } from './categories.routes';
import { specificationRouter } from './specifications.routes';
import { userRoutes } from "./users.routes";

const router = Router();

router.get("/", (request, response) => {
    response.send();
})
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/account", userRoutes);

export { router };