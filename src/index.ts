/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as userService from './db/services/userService';
// eslint-disable-next-line import/extensions
import userRouter from './api/routes/users';
import { UserInput } from './db/models/User';

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
  /*  const payload: UserInput = {
    email: String(req.body.email),
    password: String(req.body.password),
  }; */
  const payload: UserInput = req.body;
  //console.log({ payload });
  //console.log(typeof req.body.password);
  res.send('Guardando usuario');
  return userService.create(payload);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
