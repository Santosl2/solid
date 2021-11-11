import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDataProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,

        @inject("CarsRepository")
        private carsRepository: ICarsRepository,

        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,

    ) { }

    async execute({ id, user_id }: IRequest) {
        const rental = await this.rentalsRepository.findById(id);
        const car = await this.carsRepository.findById(id);

        const minHours = 24;
        const minDaily = 1;

        if (!rental) {
            throw new AppError("Aluguel não existe.");
        }

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            undefined
        );

        if (daily <= 0) {
            daily = minDaily;
        }

        const delay = this.dateProvider.compareInDays(
            undefined,
            rental.expected_return_date
        );


        let total = 0;
        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;

            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        this.rentalsRepository.create(rental);
        this.carsRepository.updateAvailable(car.id, true);


    }

}

export { DevolutionRentalUseCase };