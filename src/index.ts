import express, { Express, Request, Response } from 'express';
import areaRouter from './api/routes/areas';
import authRouter from './api/routes/auth';
import equipmentRouter from './api/routes/equipment';
import organizationRouter from './api/routes/organization';
import recordRouter from './api/routes/record';
import userRouter from './api/routes/users';

const app: Express = express();
const port = process.env.PORT;
const cors = require('cors');
const { requireAuth } = require('./api/middleware/authMiddleware');
const bodyParser = require('body-parser');

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

// app.use(cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/', authRouter);
app.use('/equipments', equipmentRouter);
app.use(requireAuth);
app.use('/organization', organizationRouter);
app.use('/users', userRouter);
app.use('/areas', areaRouter);
app.use('/records', recordRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
