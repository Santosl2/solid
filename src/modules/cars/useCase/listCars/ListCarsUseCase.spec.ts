import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "OOpss",
            daily_rate: 140.00,
            license_plate: "ABCC-1214",
            fine_amount: 100,
            brand: "Chevrolet",
            category_id: "617a1eb9-0ff4-45b3-9c78-a61513738cc6"
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca",
            description: "OOpss",
            daily_rate: 140.00,
            license_plate: "ABCC-1214",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "617a1eb9-0ff4-45b3-9c78-a61513738cc6"
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car_brand_test",
        });

        expect(cars).toEqual([car]);

    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca1",
            description: "OOpss",
            daily_rate: 140.00,
            license_plate: "ABCC-1214",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "617a1eb9-0ff4-45b3-9c78-a61513738cc6"
        });

        const cars = await listCarsUseCase.execute({
            name: "Fusca1",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Fusca2",
            description: "OOpss",
            daily_rate: 140.00,
            license_plate: "ABCC-1214",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "007"
        });

        const cars = await listCarsUseCase.execute({
            category_id: "007"
        });

        expect(cars).toEqual([car]);
    });
});