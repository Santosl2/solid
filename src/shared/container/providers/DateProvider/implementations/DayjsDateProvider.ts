import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDataProvider";

dayjs.extend(utc);


class DayjsDateProvider implements IDateProvider {
    convertToUtc(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: string): number {
        return dayjs(end_date).diff(start_date, "hours");
    }


}

export { DayjsDateProvider };