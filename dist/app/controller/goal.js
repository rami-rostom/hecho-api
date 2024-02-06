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
    getOneGoal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const goal = yield index_1.Goal.findByPk(id);
            if (!goal) {
                return res
                    .status(404)
                    .json({ error: "Goal not found. Please verify the provided id." });
            }
            res.status(200).json(goal);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getUserGoal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const goal = yield index_1.Goal.findAll({
                where: { user_id: id },
            });
            res.status(200).json(goal);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    createOneGoal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { activity, distance, duration, user_id } = req.body;
            if (!activity || !distance || !duration || !user_id) {
                return res.status(400).json({ error: "Missing body parameter(s)" });
            }
            const newGoal = yield index_1.Goal.create({
                activity,
                distance,
                duration,
                user_id,
            });
            res.status(201).json(newGoal);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    updateOneGoal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const goal = yield index_1.Goal.findByPk(id);
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
            yield goal.save();
            res.status(200).json(goal);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    deleteOneGoal: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const goal = yield index_1.Goal.findByPk(id);
            if (!goal) {
                return res
                    .status(404)
                    .json({ error: "Goal not found. Please verify the provided id." });
            }
            yield goal.destroy();
            res.status(200).json({ message: "This goal was successfully deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
};
exports.default = controller;
