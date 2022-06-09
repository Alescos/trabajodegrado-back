import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');

dotenv.config();
export const createToken = (id: number) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_TOKEN,
  });
  return token;
};
