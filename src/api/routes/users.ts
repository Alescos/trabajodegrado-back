import express from 'express';
import { UserInput } from '../../db/entity/User';
import UserService from '../../db/services/UserService';
import { UserController } from '../controllers/userController';
import { createToken } from '../createToken';

const router = express.Router();
const service = new UserService();
const userController = new UserController(service);

router.get('/', (_req, res) => {
  res.send('Obteniendo usuarios');
});

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userController.login(email, password);
    if (user) {
      const token = createToken(user['users_id']);
      // const maxAge = 4 * 60 * 60;
      res
        .status(200)
        // .cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        .json({
          name: user['users_name'],
          email: user['users_email'],
          token: token,
          message: 'Login exitoso',
        });
    } else {
      res.status(401).json({
        error: 'Credenciales incorrectas',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/register', async (req, res) => {
  try {
    const payload: UserInput = req.body;
    const result = await userController.create(payload);
    const id = result?.identifiers[0].id;
    const token = createToken(id);
    const maxAge = 4 * 60 * 60;
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json(result?.generatedMaps[0]);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  req.headers.authorization;
  res.send('Guardando usuario');
});

export default router;
