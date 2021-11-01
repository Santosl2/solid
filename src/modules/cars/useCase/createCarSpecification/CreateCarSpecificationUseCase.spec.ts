
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let carsRepositoryInMemory: CarRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
    beforeEach(() => {
        specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
        carsRepositoryInMemory = new CarRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationRepositoryInMemory
        );
    });

    it("should be able to add a new specification to a non-existent car", () => {
        expect(async () => {

            const car_id = "1234";
            const specifications_id = ["5555"];

            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification", async () => {
        const { id: car_id }: Car = await carsRepositoryInMemory.create({
            name: "Carro",
            description: "Carro",
            daily_rate: 0,
            license_plate: "ABC-1234",
            fine_amount: 0,
            brand: "Brand",
            category_id: "category"
        });

        const specifications_id = ["5555"];

        await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    });
});