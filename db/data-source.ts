import { DataSource, DataSourceOptions } from "typeorm";
import {config}  from 'dotenv'

config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'], 
    migrations: ['dist/db/migrations/*{.ts,.js}'], 
    synchronize: false,
    logging: false,
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize().then(() => {
    console.log('Database connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database!', error);
});

export default dataSource;
