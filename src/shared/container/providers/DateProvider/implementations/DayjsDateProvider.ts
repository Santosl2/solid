import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDataProvider";

dayjs.extend(utc);


class DayjsDateProvider implements IDateProvider {


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

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }
}

export { DayjsDateProvider };