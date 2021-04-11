const router = require("express").Router();
const Exercise = require("../../models/exercise.js");
const mongojs = require("mongojs");


const databaseUrl = "Workout";
const collections = ["exercise"];

const db = mongojs(databaseUrl, collections);

router.get("/api/workouts", (req, res) => {
    db.exercise.find({})
      .sort({ date: -1 },
      (error, dbExercise) => {
        if (error) {
            res.send(error);
          } else {
            res.json(dbExercise);
          }
      })
});

module.exports = router;