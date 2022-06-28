import express from 'express';
import UserService from '../../db/services/UserService';
import { UserController } from '../controllers/userController';
import { createToken } from '../createToken';

const router = express.Router();
const service = new UserService();
const userController = new UserController(service);

router.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let user = await userController.login(email, password);
    if (user !== undefined) {
      const token = createToken(user.users_id);
      res.status(200).json({
        data: {
          name: user.users_name,
          email: user.users_email,
          organization: user.users_organizationId,
          token: token,
        },
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

export default router;
