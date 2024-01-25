import { Request, Response } from "express";
import { Step } from "../models/index";

type ErrorType = {
  error?: string | null;
  message?: string | null;
};

type StepType = {
  id: number;
  name: string;
  distance: string;
  duration: string;
};

type StepsType = {
  steps: StepType[];
};

const controller = {
  getAllSteps: async (_: Request, res: Response<StepsType | ErrorType>) => {
    try {
      const steps = await Step.findAll();

      res.status(200).json(steps);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneStep: async (
    req: Request<{ id: number }>,
    res: Response<StepType | ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const step = await Step.findByPk(id);

      res.status(200).json(step);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneStep: async (
    req: Request<StepType>,
    res: Response<StepType | ErrorType>
  ) => {
    try {
      const { name, distance, duration, user_id } = req.body;

      if ((!name || !distance || !user_id) && (!name || !duration || !user_id)) {
        return res.status(400).json({ error: "Missing body parameter(s)" });
      }

      const newStep = await Step.create({
        name,
        distance,
        duration,
        user_id,
      });

      res.status(201).json(newStep);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneStep: async (
    req: Request<StepType>,
    res: Response<StepType | ErrorType>
  ) => {
    try {
      const { id } = req.params;

      const step = await Step.findByPk(id);

      if (!step) {
        return res
          .status(404)
          .json({ error: "Step not found. Please verify the provided id." });
      }

      const { name, distance, duration, user_id } = req.body;

      if (name) {
        step.name = name;
      }
      if (distance) {
        step.distance = distance;
      }
      if (duration) {
        step.duration = duration;
      }
      if (user_id) {
        step.user_id = user_id;
      }

      await step.save();

      res.status(200).json(step);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneStep: async (
    req: Request<{ id: number }>,
    res: Response<ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const step = await Step.findByPk(id);

      if (!step) {
        return res
          .status(404)
          .json({ error: "Step not found. Please verify the provided id." });
      }

      await step.destroy();

      res.status(200).json({ message: "This step was successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

export default controller;
