"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goal = exports.Tag = exports.Step = exports.Workout = exports.Sport = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const sport_1 = __importDefault(require("./sport"));
exports.Sport = sport_1.default;
const workout_1 = __importDefault(require("./workout"));
exports.Workout = workout_1.default;
const step_1 = __importDefault(require("./step"));
exports.Step = step_1.default;
const tag_1 = __importDefault(require("./tag"));
exports.Tag = tag_1.default;
const goal_1 = __importDefault(require("./goal"));
exports.Goal = goal_1.default;
// A workout has one user
user_1.default.hasMany(workout_1.default, {
    as: 'workouts',
    foreignKey: 'user_id'
});
workout_1.default.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
// A workout has one sport
sport_1.default.hasMany(workout_1.default, {
    as: 'workouts',
    foreignKey: 'sport_id'
});
workout_1.default.belongsTo(sport_1.default, {
    as: 'sport',
    foreignKey: 'sport_id'
});
// A step has one user
user_1.default.hasMany(step_1.default, {
    as: 'steps',
    foreignKey: 'user_id'
});
step_1.default.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
// A tag has one user
user_1.default.hasMany(tag_1.default, {
    as: 'tags',
    foreignKey: 'user_id'
});
tag_1.default.belongsTo(user_1.default, {
    as: 'user',
    foreignKey: 'user_id'
});
// A user has one goal
user_1.default.hasOne(goal_1.default, {
    as: 'goal',
    foreignKey: 'user_id'
});
goal_1.default.belongsTo(user_1.default);
// A workout can have several steps and a step can have several workouts
workout_1.default.belongsToMany(step_1.default, {
    as: 'steps',
    through: 'workout_has_step',
    foreignKey: 'workout_id',
    otherKey: 'step_id',
    updatedAt: false
});
step_1.default.belongsToMany(workout_1.default, {
    as: 'workouts',
    through: 'workout_has_step',
    foreignKey: 'step_id',
    otherKey: 'workout_id',
    updatedAt: false
});
// A workout can have several tags and a tag can have several workouts
workout_1.default.belongsToMany(tag_1.default, {
    as: 'tags',
    through: 'workout_has_tag',
    foreignKey: 'workout_id',
    otherKey: 'tag_id',
    updatedAt: false
});
tag_1.default.belongsToMany(workout_1.default, {
    as: 'workouts',
    through: 'workout_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'workout_id',
    updatedAt: false
});
