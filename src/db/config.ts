import { Sequelize } from 'sequelize';

const dbName = 'prueba';
const dbUser = 'postgres';
const dbHost = 'localhost';
const dbPassword = 'admin';
/* const dbName = process.env.DB_NAME as string;
const dbUser = process.env.DB_USER as string;
const dbHost = process.env.DB_HOST; */
//const dbDriver = process.env.NODE_DIAL as Dialect;
// const dbPassword = process.env.DB_PASSWORD as string;
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});

export default sequelizeConnection;
/* const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '',
  database: 'prueba',
  port: 5432,
});

const getUsers = async () => {
  const res = await pool.query('select * from users');
  console.log(res);
  pool.end();
};

getUsers();
 */
