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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const slugify_1 = __importDefault(require("slugify"));
const jwt_1 = __importDefault(require("../middlewares/jwt"));
const index_1 = require("../models/index");
const controller = {
    handleSignUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // Email must have characters before and after @, and 2 to 4 characters after the dot.
        const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/gm;
        // Password require at least 8 characters, 1 capital letter and 1 number.
        const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;
        const { email, username, password, confirmation } = req.body;
        if (!email || !username || !password) {
            return res
                .status(400)
                .json({ error: "Missing parameter(s)." });
        }
        if (password !== confirmation) {
            return res
                .status(400)
                .json({ error: "Password and confirmation isn't matching." });
        }
        if (!EMAIL_REGEX.test(email)) {
            return res
                .status(400)
                .json({ error: "Email is not valid." });
        }
        if (!PASSWORD_REGEX.test(password)) {
            return res
                .status(400)
                .json({
                error: "Password invalid (must be at least 8 characters, include one number, one capital letter and one special character).",
            });
        }
        // Verification for unique email
        const emailCheck = yield index_1.User.findOne({
            where: { email },
        });
        if (emailCheck) {
            return res
                .status(400)
                .json({
                error: "Email already used. Please try with a different email.",
            });
        }
        // Verification for unique username
        const usernameCheck = yield index_1.User.findOne({
            where: { username },
        });
        if (usernameCheck) {
            return res
                .status(400)
                .json({
                error: "Username already used. Please try with a different one.",
            });
        }
        // Slugify username
        const usernameSlugified = (0, slugify_1.default)(username, { lower: true });
        const passwordHashed = yield bcrypt_1.default.hash(password, 10);
        yield index_1.User.create({
            email,
            username,
            username_slug: usernameSlugified,
            password: passwordHashed,
            confirmation: passwordHashed,
            is_admin: false,
        });
        res
            .status(201)
            .json({ message: "User successfully created, you can now login." });
    }),
    handleSignIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Missing parameter(s)." });
        }
        const userFound = yield index_1.User.findOne({
            where: { email },
        });
        if (!userFound) {
            return res
                .status(400)
                .json({ error: "This user doesn't exist." });
        }
        // Function is launch if the password match with the decrypted password. It will also generate JWT tokens.
        // TODO: change types for bcrypt
        const verificationAuthBcrypt = (errBcrypt, resBcrypt) => {
            if (resBcrypt) {
                return res.status(200).json({
                    userId: userFound.id,
                    username: userFound.username,
                    username_slug: userFound.username_slug,
                    token: `Bearer ${jwt_1.default.generateAccessToken(userFound)}`,
                    refreshToken: `Bearer ${jwt_1.default.generateRefreshToken(userFound)}`,
                });
            }
            else {
                return res
                    .status(400)
                    .json({ error: "Please verify provided credentials." });
            }
        };
        bcrypt_1.default.compare(password, userFound.password, verificationAuthBcrypt);
    }),
};
exports.default = controller;
