import express, { Express, Request, Response } from 'express';
import organizationRouter from './api/routes/organization';
import userRouter from './api/routes/users';

const app: Express = express();
const port = process.env.PORT;
const cors = require('cors');
const bodyParser = require('body-parser');

let corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

// app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use('/users', userRouter);
app.use('/organization', organizationRouter);

/* app.get('/organization/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const organization: any = await organizationController.get(id);
    if (organization) {
      res.status(200).json({
        name: organization.name,
        NIT: organization.NIT,
        description: organization.description,
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Organization not found',
      description: error,
    });
  }
}); */

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
