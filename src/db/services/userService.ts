import { AppDataSource } from '../data-source';
import { User, UserInput } from '../entity/User';

export const createUser = async (payload: UserInput) => {
  const userRepository = AppDataSource.getRepository(User);
  let { email, userName, phone, password } = payload;
  let user = new User();
  user.email = email.toLowerCase();
  user.name = userName;
  user.phone = phone;
  user.password = password;
  const res = await userRepository
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      { email: email, name: userName, phone: phone, password: password },
    ])
    .execute();
  console.log(res);
  return res;
};

/* export const create = (payload: UserInput): Promise<UserOutput> => {
  return userDal.create(payload);
};
 */
