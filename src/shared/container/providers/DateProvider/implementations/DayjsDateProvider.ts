import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDataProvider";

dayjs.extend(utc);


class DayjsDateProvider implements IDateProvider {
    compareIfBefore(start: Date, end: Date): boolean {
        return dayjs(start).isBefore(end);
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date = this.dateNow(), end_date: Date = this.dateNow()): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(start_date_utc).diff(end_date_utc, "hours");
    }

    compareInDays(start_date: Date = this.dateNow(), end_date: Date = this.dateNow()): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(start_date_utc).diff(end_date_utc, "days");
    }

    add(quantity: number, type: string = "days"): Date {
        return dayjs().add(quantity, type).toDate();
    }
}

export { DayjsDateProvider };