import express from 'express';
import { UserInput, UserOutput } from '../../db/entity/User';
import UserService from '../../db/services/UserService';
import { UserController } from '../controllers/userController';

const router = express.Router();
const service = new UserService();
const userController = new UserController(service);

router.get('/getAll/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const users = await userController.getUsers(id);
    if (users) {
      res.status(200).json({
        data: users,
        message: 'Respuesta de usuarios',
      });
    }
  } catch (error) {
    res.status(404).json({
      message: 'Organization not found',
      description: error,
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    const payload: UserInput = req.body;
    console.log(payload);
    const user = await userController.create(payload);
    res.status(200).json(user?.generatedMaps[0]);
  } catch (error) {
    console.log(error);
  }
});

router.get('/getUsersByArea/:organization/:id', async (req, res) => {
  const organization = req.params.organization;
  const id = req.params.id;
  const users = await userController.getUsersByAreas(id, organization);
  res.send(JSON.stringify(users));
});

router.post('/update', async (req, res) => {
  req.headers.authorization;
  res.send('Guardando usuario');
});

router.get('/download', async (_req, _res) => {
  //rpute
});

router.get('/:id', async (req, res) => {
  const id: string = req.params.id;
  let user: UserOutput;
  const response = await userController.getUser(id);
  response ? (user = response as UserOutput) : null;
  res.status(200).json({
    id: user!.id,
    email: user!.email,
    name: user!.name,
    phone: user!.phone,
    role: user!.role,
    areas: user!.areas,
    createdAt: user!.createdAt,
    deleteAt: user!.deletedAt,
  });
});
export default router;
