import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

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
        private dateProvider: IDateProvider,

        @inject("CarsRepository")
        private carsRepo: ICarsRepository
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

        await this.carsRepo.updateAvailable(car_id, false);

        return rental;
    }

}

export { CreateRentalUseCase };