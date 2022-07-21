import { User, UserInput } from '../../db/entity/User';
import UserService from '../../db/services/UserService';

export class UserController {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  create(payload: UserInput) {
    const { email, name, phone, password, organization, role } = payload;
    const newUser = new User();
    newUser.email = email.toLowerCase();
    newUser.name = name;
    newUser.phone = phone;
    newUser.password = password;
    newUser.organization = organization;
    newUser.role = role;
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

  getUsers(id: string) {
    const res = this.userService.getUsers(id);
    return res;
  }

  getUser(id: number) {
    const res = this.userService.getUserById(id);
    return res;
  }
}
