import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as userService from './db/services/userService';
// eslint-disable-next-line import/extensions
import userRouter from './api/routes/users';
import { UserInput } from './db/entity/User';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
// const port = 8000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(bodyParser.json());
app.use('/users', userRouter);

app.post('/login', (req: Request, res: Response) => {
  const payload: UserInput = req.body;
  res.send('Guardando usuario');
  return userService.createUser(payload);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
