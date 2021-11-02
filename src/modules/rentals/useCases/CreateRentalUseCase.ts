import { AppError } from "@shared/errors/AppError";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private rentalsRepository: IRentalsRepository
    ) { }

    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {

        const carAlreadyRented = await this.rentalsRepository.findByCar(car_id);

        if (carAlreadyRented) {
            throw new AppError("Esse carro já está alugado.");
        }

        const userAlreadyRentedCar = await this.rentalsRepository.
            findOpenRentalByUser(user_id);

        if (userAlreadyRentedCar) {
            throw new AppError("Este usuário já tem um carro alugado.");
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        });

        return rental;
    }

}

export { CreateRentalUseCase };