import { Request, Response } from 'express';
import { User } from '../models/index';

type ErrorType = {
  error?: string | null;
  message?: string | null;
}

type UserType = {
  id: number;
  username: string;
  username_slug: string;
  email: string;
  password: string;
  avatar: string;
  is_admin: boolean;
}

type UsersType = {
  users: UserType[];
}

const controller = {
  getAllUsers: async (
    _: Request,
    res: Response<UsersType | ErrorType>
    ) => {
    try {
      const users = await User.findAll();

      res
        .status(200)
        .json(users);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneUser: async (
    req: Request<{ id: number }>,
    res: Response<UserType | ErrorType>
    ) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      res
        .status(200)
        .json(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

export default controller;