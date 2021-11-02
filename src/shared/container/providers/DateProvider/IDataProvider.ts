interface IDateProvider {
    compareInHours(start_date: Date, end_date: string): number;
    convertToUtc(date: Date): string;
}

export { IDateProvider };