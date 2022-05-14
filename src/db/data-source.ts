import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
dotenv.config();
const host = process.env.DB_HOST as string;
const port = process.env.DB_PORT as undefined;
const username = process.env.DB_DRIVER as string;
const password = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connection successfull');
  })
  .catch((error) => console.log(error));
