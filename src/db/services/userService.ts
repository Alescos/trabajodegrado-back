import { AppDataSource } from '../config';
import { User, UserInput } from '../entity/User';

export default class UserService {
  userRepository = AppDataSource.getRepository(User);
  bcrypt = require('bcrypt');

  async login(user: UserInput) {
    const result = await this.userRepository
      .createQueryBuilder('users')
      .where('users.email = :email', { email: user.email })
      .getRawOne();
    const match = await this.bcrypt.compare(
      user.password,
      result['users_password']
    );
    if (match) {
      return result;
    }
  }

  async createUser(user: UserInput) {
    const salt = await this.bcrypt.genSalt(11);
    try {
      const res = this.userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            email: user.email,
            name: user.name,
            phone: user.phone,
            password: await this.bcrypt.hash(user.password, salt),
          },
        ])
        .execute();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      const res = await this.userRepository
        .createQueryBuilder('users')
        .getMany();
      return res;
    } catch (error) {
      return error;
    }
  }

  async getUserById(id: number) {
    try {
      const res = await this.userRepository
        .createQueryBuilder('users')
        .where('user.id = :id', { id: id })
        .getOne();
      return res;
    } catch (error) {
      return error;
    }
  }
}
