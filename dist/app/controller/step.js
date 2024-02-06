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
    getAllSteps: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const steps = yield index_1.Step.findAll();
            res.status(200).json(steps);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getOneStep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const step = yield index_1.Step.findByPk(id);
            res.status(200).json(step);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    createOneStep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, distance, duration, user_id } = req.body;
            if ((!name || !distance || !user_id) && (!name || !duration || !user_id)) {
                return res.status(400).json({ error: "Missing body parameter(s)" });
            }
            const newStep = yield index_1.Step.create({
                name,
                distance,
                duration,
                user_id,
            });
            res.status(201).json(newStep);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    updateOneStep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const step = yield index_1.Step.findByPk(id);
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
            yield step.save();
            res.status(200).json(step);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    deleteOneStep: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const step = yield index_1.Step.findByPk(id);
            if (!step) {
                return res
                    .status(404)
                    .json({ error: "Step not found. Please verify the provided id." });
            }
            yield step.destroy();
            res.status(200).json({ message: "This step was successfully deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
};
exports.default = controller;
