const router = require("express").Router();
const Exercise = require("../../models/exercise.js");
const mongojs = require("mongojs");
const http = require('http');
const fs = require('fs');
const path = require('path');
const ObjectId = require('mongoose').Types.ObjectId; 


const databaseUrl = "workouts";
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

router.post("/api/workouts", (req, res) => {
    db.exercise.insert({day: new Date(new Date().setDate(new Date().getDate() - 0)), exercises: []},
      (error, dbExercise) => {
        if (error) {
            res.send(error);
          } else {
            res.json(dbExercise);
          }
      })
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.param.id);
    db.exercise.findOne({_id: ObjectId(req.params.id)}, (error, data) => {
        if (error) {
            res.send(error)
        } else {
          console.log(data);
          if (data.exercises == undefined || data.exercises == null) {
             data.exercises = [];
          }
            data.exercises.push(req.body);
            db.exercise.update(
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
  console.log(req.param.id);
  // res.sendFile(path.join(__dirname, '../../public/exercise.html'));
  // filePath = `${__dirname}` +`../../../public/exercise.html`;
      // return getHtml(filePath, res);
    // res.sendFile(__dirname + "../../public/exercise.html");
    // var filename = `${__dirname}` +`../../../public/exercise.html`;
    // fs.readFile(`${__dirname}` +`../../../public/exercise.html`, (err, data) => {
      // if (err) throw err;
      // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
      // an html file.
    // });
      // res.writeHead(200, { 'Content-Type': 'text/html' });
      // res.sendFile(filename);
      // res.end(data);
    // db.exercise.find({id: req.params.id}, (error, data) => {
    //     if (error) {
    //         res.send(error)
    //     } else {
    //         res.sendFile(exercise.html, __dirname + "../../public/");
    //       }
    //     }  
            // )
            res.status(200);
            res.end();

});


router.get("/api/workouts/range", (req, res) => {
  db.exercise.find({})
    .sort({ day: -1 })
    .limit(7,
    (error, dbExercise) => {
      if (error) {
          res.send(error);
        } else {
          res.json(dbExercise);
        }
    })
});

module.exports = router;