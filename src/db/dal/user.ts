import { Op } from 'sequelize';
import User, { UserInput, UserOutput } from '../models/User';
import { GetAllUsersFilters } from './types';

export const create = async (payload: UserInput): Promise<UserOutput> => {
  console.log(payload);
  const user = await User.create(payload);
  return user;
};

export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found ');
  }

  const updateUser = await (user as User).update(payload);
  return updateUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found ');
  }
  return user;
};

export const userById = async (id: number): Promise<boolean> => {
  const deleteUserCount = await User.destroy({
    where: { id },
  });

  return !!deleteUserCount;
};

export const getAll = async (
  filters?: GetAllUsersFilters
): Promise<UserOutput[]> => {
  return User.findAll({
    where: {
      ...(filters?.isDeleted && { deletedAt: { [Op.not]: null } }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && { paranoid: true }),
  });
};
