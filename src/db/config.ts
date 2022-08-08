import dotenv from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Area } from './entity/Area';
import { Equipment } from './entity/Equipment';
import { Organization } from './entity/Organization';
import { Record } from './entity/Record';
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
  entities: [User, Organization, Area, Equipment, Record],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Connection successfull');
  })
  .catch((error) => console.log(error));
