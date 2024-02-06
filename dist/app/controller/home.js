"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller = {
    renderHomePage: (_, res) => {
        res.sendFile('index.html', { root: process.cwd() });
    }
};
exports.default = controller;
