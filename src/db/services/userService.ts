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
            areas: user.areas,
            password: await this.bcrypt.hash(user.password, salt),
            organization: user.organization,
            role: user.role,
          },
        ])
        .execute();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers(id: string) {
    try {
      const res = await this.userRepository
        .createQueryBuilder('users')
        .where('users.organizationId = :id', { id: id })
        .getMany();
      return res;
    } catch (error) {
      return error;
    }
  }

  async getUsersByAreas(id: string, organization: string) {
    try {
      /* const area = await this.userRepository.findBy({
        areas: ArrayContains([id]),
      }); */
      const area = [id];
      /* const users = await this.userRepository.find();
      console.log(users[0].areas); */
      /* const users = await this.userRepository
        .createQueryBuilder('users')
        .where('users.user.areas @> :area', { area: area });

      console.log(users); */
      /* const users = await this.userRepository.find({
        relations: {
          organization: true,
        },
        where: [
          {
            areas: ArrayContains([id]),
            
            
          },
        ],
      }); */
      const users = await this.userRepository
        .createQueryBuilder('users')
        .where('users.organizationId = :id', { id: organization })
        .andWhere('users.areas @> :area', { area: area })
        .getMany();
      return users;
    } catch (error) {
      console.log(error);
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

  async editUser(user: UserInput) {
    try {
      const res = await this.userRepository
        .createQueryBuilder('users')
        .update(User)
        .set({
          email: user.email,
          name: user.name,
          phone: user.phone,
          password: user.password,
        })
        .where('user.id = :id', { id: user.id })
        .execute();
      return res;
    } catch (error) {
      return error;
    }
  }
}
