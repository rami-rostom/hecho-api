import { Request, Response } from "express";
import { Workout } from "../models/index";

type ErrorType = {
  error?: string | null;
  message?: string | null;
};

type WorkoutType = {
  id: number;
  name: string;
  date_scheduled: string;
  date_accomplished: string;
  distance: number;
  duration: number;
  pace: number;
  hecho: boolean;
  user_id: number;
  sport_id: number;
};

type WorkoutsType = {
  workouts: WorkoutType[];
};

const controller = {
  getAllWorkouts: async (
    _: Request,
    res: Response<WorkoutsType | ErrorType>
  ) => {
    try {
      const workouts = await Workout.findAll({
        include: ["steps", "tags"],
      });

      res.status(200).json(workouts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  getOneWorkout: async (
    req: Request<{ id: number }>,
    res: Response<WorkoutType | ErrorType>
  ) => {
    try {
      const { id } = req.params;

      const workout = await Workout.findByPk(id, {
        include: ["steps", "tags"],
      });

      if (!workout) {
        return res
          .status(404)
          .json({ error: "Workout not found. Please verify the provided id." });
      }

      res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  createOneWorkout: async (
    req: Request<WorkoutType>,
    res: Response<WorkoutType | ErrorType>
  ) => {
    try {
      const { name, sport_id, user_id, hecho } = req.body;

      if (!name || !sport_id || !user_id || !hecho) {
        return res.status(400).json({ error: "Missing body parameter(s)" });
      }

      const newWorkout = await Workout.create({
        name,
        sport_id,
        user_id,
        hecho,
      });

      res.status(201).json(newWorkout);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  updateOneWorkout: async (
    req: Request<WorkoutType>,
    res: Response<WorkoutType | ErrorType>
  ) => {
    try {
      const { id } = req.params;

      const workout = await Workout.findByPk(id);

      if (!workout) {
        return res
          .status(404)
          .json({ error: "Workout not found. Please verify the provided id." });
      }

      const {
        name,
        date_scheduled,
        date_accomplished,
        distance,
        duration,
        pace,
        hecho,
        sport_id,
      } = req.body;

      if (name) {
        workout.name = name;
      }
      if (date_scheduled) {
        workout.date_scheduled = date_scheduled;
      }
      if (date_accomplished) {
        workout.date_accomplished = date_accomplished;
      }
      if (distance) {
        workout.distance = distance;
      }
      if (duration) {
        workout.duration = duration;
      }
      if (pace) {
        workout.pace = pace;
      }
      if (hecho) {
        workout.hecho = hecho;
      }
      if (sport_id) {
        workout.sport_id = sport_id;
      }

      await workout.save();

      res.status(200).json(workout);
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },

  deleteOneWorkout: async (
    req: Request<{ id: number }>,
    res: Response<ErrorType>
  ) => {
    try {
      const { id } = req.params;
      const workout = await Workout.findByPk(id);

      if (!workout) {
        return res
          .status(404)
          .json({ error: "Workout not found. Please verify the provided id." });
      }

      await workout.destroy();

      res
        .status(200)
        .json({ message: "This workout was successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json(error.toString());
    }
  },
};

export default controller;
