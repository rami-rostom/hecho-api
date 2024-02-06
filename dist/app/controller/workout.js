"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
const controller = {
    getAllWorkouts: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const workouts = yield index_1.Workout.findAll({
                include: ["steps", "tags"],
            });
            res.status(200).json(workouts);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getAllUserWorkouts: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const workouts = yield index_1.Workout.findAll({
                include: ["steps", "tags", "sport"],
                where: { user_id: id },
                order: [['date_scheduled', 'DESC']],
            });
            res.status(200).json(workouts);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getOneWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const workout = yield index_1.Workout.findByPk(id, {
                include: [
                    "sport",
                    "tags",
                    "steps"
                ],
                order: [["steps", 'createdAt', 'ASC']],
            });
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            res.status(200).json(workout);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    createOneWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, sport_id, date_scheduled, user_id, hecho } = req.body;
            if (!name || !sport_id || !date_scheduled || !user_id) {
                return res.status(400).json({ error: "Missing body parameter(s)" });
            }
            const newWorkout = yield index_1.Workout.create({
                name,
                sport_id,
                date_scheduled,
                user_id,
                hecho,
            });
            res.status(201).json(newWorkout);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    updateOneWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            const { name, date_scheduled, date_accomplished, distance, duration, pace, hecho, sport_id, } = req.body;
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
            yield workout.save();
            res.status(200).json(workout);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    deleteOneWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            yield workout.destroy();
            res
                .status(200)
                .json({ message: "This workout was successfully deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    addStepToWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { step_id } = req.body;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            // Use Sequelize method to add step to workout
            yield workout.addSteps(step_id);
            res.status(200).json({ message: "Step added to workout." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    removeStepFromWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { step_id } = req.body;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            // Use Sequelize method to remove step from workout
            yield workout.removeSteps(step_id);
            res.status(200).json({ message: "Step removed from workout." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    addTagToWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { tag_id } = req.body;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            // Use Sequelize method to add tag to workout
            yield workout.addTags(tag_id);
            res.status(200).json({ message: "Tag added to workout." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    removeTagFromWorkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { tag_id } = req.body;
            const workout = yield index_1.Workout.findByPk(id);
            if (!workout) {
                return res
                    .status(404)
                    .json({ error: "Workout not found. Please verify the provided id." });
            }
            // Use Sequelize method to remove tag from workout
            yield workout.removeTags(tag_id);
            res.status(200).json({ message: "Tag removed from workout." });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    })
};
exports.default = controller;
