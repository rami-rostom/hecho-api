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
    getAllSports: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const sports = yield index_1.Sport.findAll();
            res.status(200).json(sports);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
    getOneSport: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const sport = yield index_1.Sport.findByPk(id);
            res.status(200).json(sport);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error.toString());
        }
    }),
};
exports.default = controller;
