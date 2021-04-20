const router = require("express").Router();
const Exercise = require("../../models/exercise.js");
const mongojs = require("mongojs");
const ObjectId = require('mongoose').Types.ObjectId; 


router.get("/api/workouts", (req, res) => {
    Exercise.find({})
      .sort({ date: -1 })
      .then(dbExercise => {
            res.json(dbExercise);

      // const totalDuration = Exercise.aggregate([
      //         {$match: {}},
      //         {$group: {_id:"exercises.duration", totalDuration: {$sum: "$duration"}}}
      //       ])
      //       // console.log(totalDuration);
      //       res.json(...dbExercise, totalDuration);
          })
      // })
});

router.post("/api/workouts", (req, res) => {
    Exercise.create({day: new Date(new Date().setDate(new Date().getDate() - 0)), exercises: []}).then(
      dbExercise => {
            res.json(dbExercise);
          }
      )
      .catch(err => {
        res.status(404).json(err);
      })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.param.id);
    Exercise.findOne({_id: ObjectId(req.params.id)}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
          console.log(data);
          if (data.exercises == undefined || data.exercises == null) {
             data.exercises = [];
          }
            data.exercises.push(req.body);
            Exercise.update(
        {_id: mongojs.ObjectId(req.params.id)},
        { $set: {exercises: data.exercises}},
        (error, dbExercise) => {
        if (error) {
            res.send(error);
          } else {
            res.json(dbExercise);
          }
        }  
            )
    }
});
});

router.get("/api/exercise/:id", (req, res) => {
  
  res.status(200);
  res.end();
});


router.get("/api/workouts/range", (req, res) => {
  Exercise.find({}).sort({ day: -1 }).limit(7).exec(
    (error, dbExercise) => {
      if (error) {
        console.error(error);
          res.send(error);
        } else {
          res.json(dbExercise);
        }
    })
});

// router.delete("/api/workouts/delete/:id", (req, res) => {
//   console.log(req.param.id);
//   Exercise.findOne({"_id": ObjectId(req.param.id)}).then(dbExercise => {
//     if (!dbExercise.exercises.length) {
//       Exercise.deleteOne({"_id": ObjectID(req.param.id)});
//     }
//   });
// })

module.exports = router;