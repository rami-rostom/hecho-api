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
    getAllTags: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const tags = yield index_1.Tag.findAll();
            res.status(200).json(tags);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getOneTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const tag = yield index_1.Tag.findByPk(id);
            res.status(200).json(tag);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getAllUserTags: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const tags = yield index_1.Tag.findAll({
                where: { user_id: id },
            });
            res.status(200).json(tags);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    createOneTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, user_id } = req.body;
            if (!name || !user_id) {
                return res.status(400).json({ error: "Missing body parameter(s)" });
            }
            const newTag = yield index_1.Tag.create({
                name,
                user_id,
            });
            res.status(201).json(newTag);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    updateOneTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const tag = yield index_1.Tag.findByPk(id);
            if (!tag) {
                return res
                    .status(404)
                    .json({ error: "Tag not found. Please verify the provided id." });
            }
            const { name, user_id } = req.body;
            if (name) {
                tag.name = name;
            }
            if (user_id) {
                tag.user_id = user_id;
            }
            yield tag.save();
            res.status(200).json(tag);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    deleteOneTag: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const tag = yield index_1.Tag.findByPk(id);
            if (!tag) {
                return res
                    .status(404)
                    .json({ error: "Tag not found. Please verify the provided id." });
            }
            yield tag.destroy();
            res.status(200).json({ message: "This tag was successfully deleted" });
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
};
exports.default = controller;
