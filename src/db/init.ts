import dotenv from 'dotenv';
import User from './models/User';
dotenv.config();
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  User.sync({ alter: isDev });
};

export default dbInit;
