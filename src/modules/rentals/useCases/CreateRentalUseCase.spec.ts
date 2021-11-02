import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let rentalInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DayjsDateProvider;

describe("Create Rental", () => {
    const dayAdd24H = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalInMemory, dateProvider);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: "00077",
            expected_return_date: dayAdd24H
        });


        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "00077",
                expected_return_date: dayAdd24H
            });

            const rental = await createRentalUseCase.execute({
                user_id: "123",
                car_id: "00077",
                expected_return_date: dayAdd24H
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("should not be able o create a new rental if there is another open to the same car", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "Tesla",
                expected_return_date: dayAdd24H
            });

            const rental = await createRentalUseCase.execute({
                user_id: "321",
                car_id: "Tesla",
                expected_return_date: dayAdd24H
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able o create a new rental with invalid date", () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "123",
                car_id: "Tesla",
                expected_return_date: dayjs().toDate()
            });
        }).rejects.toBeInstanceOf(AppError);
    })

})