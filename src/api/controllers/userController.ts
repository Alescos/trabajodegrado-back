import { User, UserInput } from '../../db/entity/User';
import UserService from '../../db/services/UserService';

export class UserController {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  create(payload: UserInput) {
    const { email, name, phone, password } = payload;
    const newUser = new User();
    newUser.email = email.toLowerCase();
    newUser.email = email;
    newUser.name = name;
    newUser.phone = phone;
    newUser.password = password;
    const res = this.userService.createUser(newUser);
    return res;
  }

  login(email: string, password: string) {
    const user = new User();
    user.email = email;
    user.password = password;
    const res = this.userService.login(user);
    return res;
  }

  getUsers() {
    const res = this.userService.getUsers();
    return res;
  }

  getUser(id: number) {
    const res = this.userService.getUserById(id);
    return res;
  }
}
