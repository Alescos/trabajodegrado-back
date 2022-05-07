import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;

  public email!: string;

  public password!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly deletedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: 'user',
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    createdAt: 'createdat',
    updatedAt: 'updatedat',
    deletedAt: 'deletedat',
  }
);

export default User;
