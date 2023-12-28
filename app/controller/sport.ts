import { Request, Response } from 'express';
import { Sport } from '../models/index';

type ErrorType = {
  error?: string | null;
  message?: string | null;
}

type SportType = {
  id: number;
  name: string;
}

type SportsType = {
  sports: SportType[];
}

const controller = {
  getAllSports: async (
    _: Request,
    res: Response<SportsType | ErrorType>
    ) => {
    try {
      const sports = await Sport.findAll();

      res
        .status(200)
        .json(sports);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneSport: async (
    req: Request<{ id: number }>,
    res: Response<SportType | ErrorType>
    ) => {
    try {
      const { id } = req.params;
      const sport = await Sport.findByPk(id);

      res
        .status(200)
        .json(sport);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

export default controller;