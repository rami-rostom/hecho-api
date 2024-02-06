"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors = require('cors');
const router_1 = __importDefault(require("./app/router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(router_1.default);
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
