import express from 'express';
import * as userService from '../../db/services/userService';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Obteniendo usuarios');
});

router.post('/', async (req, res) => {
  const payload = req.body;
  res.send('Guardando usuario');
  return userService.create(payload);
});

export default router;
