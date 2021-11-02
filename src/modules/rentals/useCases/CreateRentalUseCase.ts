import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Rental } from "../infra/typeorm/entities/Rental";
import { AppError } from "@shared/errors/AppError";
import { IRentalsRepository } from "../repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { inject, injectable } from "tsyringe";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
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

        const compare = this.dateProvider.compareInHours(
            undefined,
            expected_return_date
        );


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