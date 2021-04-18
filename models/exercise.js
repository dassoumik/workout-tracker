const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{
  name: {
    type: String,
    trim: true,
    required: "Enter a name for exercise"
    // required: false
  },
  type: {
    type: String,
    required: "Enter the type of exercise"
    // required: false
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
    // required: false
  },
  distance: {
    type: Number,
    required: false
  }
}]
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
