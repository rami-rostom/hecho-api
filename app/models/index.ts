import User from './user';
import Sport from './sport';
import Workout from './workout';
import Step from './step';
import Tag from './tag';

// A workout has one user
User.hasMany(Workout, {
  as: 'workouts',
  foreignKey: 'user_id'
});
Workout.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id' 
});

// A workout has one sport
Sport.hasMany(Workout, {
  as: 'workouts',
  foreignKey: 'sport_id'
});
Workout.belongsTo(Sport, {
  as: 'sport',
  foreignKey: 'sport_id' 
});


// A workout can have several steps and a step can have several workouts
Workout.belongsToMany(Step, {
  as: 'steps',
  through: 'workout_has_step',
  foreignKey: 'workout_id',
  otherKey: 'step_id',
  updatedAt: false
});
Step.belongsToMany(Workout, {
  as: 'workouts',
  through: 'workout_has_step',
  foreignKey: 'step_id',
  otherKey: 'workout_id',
  updatedAt: false
});

// A workout can have several tags and a tag can have several workouts
Workout.belongsToMany(Tag, {
  as: 'tags',
  through: 'workout_has_tag',
  foreignKey: 'workout_id',
  otherKey: 'tag_id',
  updatedAt: false
});
Tag.belongsToMany(Workout, {
  as: 'workouts',
  through: 'workout_has_tag',
  foreignKey: 'tag_id',
  otherKey: 'workout_id',
  updatedAt: false
});

export { User, Sport, Workout, Step, Tag };
