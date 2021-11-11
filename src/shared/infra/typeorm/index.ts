import { createConnection, getConnectionOptions } from "typeorm";

//createConnection();

interface IOptions {
    host: string;
    database: string;
}

getConnectionOptions().then(options => {
    const newOptions = options as IOptions;

    newOptions.database = process.env.NODE_ENV === "test"
        ? "supertest_db" : newOptions.database;

    newOptions.host = process.env.NODE_ENV === "test"
        ? 'localhost' : 'database';

    createConnection({
        ...options,
    });
});


