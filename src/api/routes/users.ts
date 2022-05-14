import express from 'express';
import { UserInput } from '../../db/entity/User';
import * as userService from '../../db/services/userService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Obteniendo usuarios');
});
router.post('/register', async (req, res) => {
  const payload: UserInput = req.body;
  console.log(payload);
  res.send('Guardando usuario');
  return userService.createUser(payload);
});
router.post('/', async (_req, res) => {
  //const payload = req.body;
  res.send('Guardando usuario');
  //return userService.create(payload);
});

export default router;
