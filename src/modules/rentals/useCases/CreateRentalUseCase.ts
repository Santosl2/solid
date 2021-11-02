import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "../infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "../repositories/IRentalsRepository";

dayjs.extend(utc);

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
        const minHours = 24;

        const carAlreadyRented = await this.rentalsRepository.
            findOpenRentalByCar(car_id);

        if (carAlreadyRented) {
            throw new AppError("Esse carro já está alugado.");
        }

        const userAlreadyRentedCar = await this.rentalsRepository.
            findOpenRentalByUser(user_id);

        if (userAlreadyRentedCar) {
            throw new AppError("Este usuário já tem um carro alugado.");
        }

        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

        if (compare < minHours) {
            throw new AppError("Invalid return time!");
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