const express = require("express");
const router = require("./routes/api/workouts");
const mongoose = require("mongoose");
var url = "mongodb://localhost:27017/Workout";

const PORT = process.env.PORT || 3000

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api/workouts.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
