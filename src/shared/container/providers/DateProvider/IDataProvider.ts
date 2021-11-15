interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    compareInDays(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    add(quantity: number, type?: string): Date;
    compareIfBefore(start: Date, end: Date): boolean;
}

export { IDateProvider };