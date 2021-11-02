import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let rentalInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "123",
            car_id: "00077",
            expected_return_date: new Date()
        });


        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

})