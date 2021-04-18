const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for exercise"
  },
  type: {
    type: String,
    required: "Enter the type of exercise"
  },
  weight: {
    type: Number,
    required: false
  },
  sets: {
    type: Number,
    required: false
  },
  reps: {
    type: Number,
    required: false
  },
  duration: {
    type: Number,
    required: "Enter duration in minutes for the exercise"
  },
  distance: {
    type: Number,
    required: false
  },
  day: {
    type: Date,
    default: Date.now
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
