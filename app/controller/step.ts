import { Request, Response } from 'express';
import { Step } from '../models/index';

type ErrorType = {
  error?: string | null;
  message?: string | null;
}

type StepType = {
  id: number;
  name: string;
  distance: string;
  duration: string;
}

type StepsType = {
  steps: StepType[];
}

const controller = {
  getAllSteps: async (
    _: Request,
    res: Response<StepsType | ErrorType>
    ) => {
    try {
      const steps = await Step.findAll();

      res
        .status(200)
        .json(steps);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  },

  getOneStep: async (
    req: Request<{ id: number }>,
    res: Response<StepType | ErrorType>
    ) => {
    try {
      const { id } = req.params;
      const step = await Step.findByPk(id);

      res
        .status(200)
        .json(step);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json(error.toString());
    }
  }
};

export default controller;