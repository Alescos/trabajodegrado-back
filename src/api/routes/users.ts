import express from 'express';
import { UserInput } from '../../db/entity/User';
import UserService from '../../db/services/UserService';
import { UserController } from '../controllers/userController';
import { createToken } from '../createToken';

const router = express.Router();
const service = new UserService();
const userController = new UserController(service);

router.get('/getAll/:id', async (req, res) => {
  const id = req.params.id;
  const users = await userController.getUsers(id);
  if (users) {
    res.status(200).json({
      data: users,
      message: 'Respuesta de usuarios',
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    const payload: UserInput = req.body;
    const user = await userController.create(payload);
    const id = user?.identifiers[0].id;
    const token = createToken(id);
    const maxAge = 4 * 60 * 60;
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(user?.generatedMaps[0]);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  req.headers.authorization;
  res.send('Guardando usuario');
});

export default router;
