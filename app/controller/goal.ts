import { Request, Response } from "express";
import { Goal } from "../models/index";

type ErrorType = {
  error?: string | null;
  message?: string | null;
};

type GoalType = {
  id: number;
  activity: number;
  distance: number;
  duration: string;
  user_id: number;
};

const controller = {
  getOneGoal: async (
    req: Request<{ id: number }>,
    res: Response<GoalType | ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const goal = await Goal.findByPk(id);

      if (!goal) {
        return res
          .status(404)
          .json({ error: "Goal not found. Please verify the provided id." });
      }

      res.status(200).json(goal);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getUserGoal: async (
    req: Request<{ id: number }>,
    res: Response<GoalType | ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const goal = await Goal.findAll({
        where: { user_id: id },
      });

      res.status(200).json(goal);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneGoal: async (
    req: Request<GoalType>,
    res: Response<GoalType | ErrorType>
  ) => {
    try {
      const { activity, distance, duration, user_id } = req.body;

      if (!activity || !distance || !duration || !user_id) {
        return res.status(400).json({ error: "Missing body parameter(s)" });
      }

      const newGoal = await Goal.create({
        activity,
        distance,
        duration,
        user_id,
      });

      res.status(201).json(newGoal);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneGoal: async (
    req: Request<GoalType>,
    res: Response<GoalType | ErrorType>
  ) => {
    try {
      const { id } = req.params;

      const goal = await Goal.findByPk(id);

      if (!goal) {
        return res
          .status(404)
          .json({ error: "Goal not found. Please verify the provided id." });
      }

      const { activity, distance, duration, user_id } = req.body;

      if (activity) {
        goal.activity = activity;
      }
      if (distance) {
        goal.distance = distance;
      }
      if (duration) {
        goal.duration = duration;
      }
      if (user_id) {
        goal.user_id = user_id;
      }

      await goal.save();

      res.status(200).json(goal);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneGoal: async (
    req: Request<{ id: number }>,
    res: Response<ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const goal = await Goal.findByPk(id);

      if (!goal) {
        return res
          .status(404)
          .json({ error: "Goal not found. Please verify the provided id." });
      }

      await goal.destroy();

      res.status(200).json({ message: "This goal was successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

export default controller;
