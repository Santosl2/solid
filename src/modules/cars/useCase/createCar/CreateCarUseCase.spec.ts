import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carRepository: CarRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carRepository = new CarRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carRepository);
    });

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Carro",
            description: "Carro",
            daily_rate: 0,
            license_plate: "ABC-1234",
            fine_amount: 0,
            brand: "Brand",
            category_id: "category"
        });


        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car if exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Carro 1",
                description: "Carro",
                daily_rate: 0,
                license_plate: "ABC-1234",
                fine_amount: 0,
                brand: "Brand",
                category_id: "category"
            });

            await createCarUseCase.execute({
                name: "Carro 2",
                description: "Carro",
                daily_rate: 0,
                license_plate: "ABC-1234",
                fine_amount: 0,
                brand: "Brand",
                category_id: "category"
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car with available true by default", async () => {
        const car = await createCarUseCase.execute({
            name: "Carro AV",
            description: "Carro",
            daily_rate: 0,
            license_plate: "ABCD-1234",
            fine_amount: 0,
            brand: "Brand",
            category_id: "category"
        });

        expect(car.available).toBe(true);
    });
});