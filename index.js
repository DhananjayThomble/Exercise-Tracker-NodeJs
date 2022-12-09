const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const users = [];
const exercises = [];
const logs = [];

app.get("/api/users", (request, respose) => {
  respose.send(users);
});

app.post("/api/users", (request, respose) => {
  const username = request.body.username;
  // console.log(username);

  // response should be : {
  /*   username: "fcc_test",
  _id: "5fb5853f734231456ccb3b05"
} */
  // _id should be a unique id
  const _id = crypto.randomBytes(16).toString("hex");
  const user = {
    username: username,
    _id: _id,
  };
  // add user to users array
  users.push(user);

  respose.json(user);
});

app.post("/api/users/:_id/exercises", (request, respose) => {
  /* {
  username: "fcc_test",
  description: "test",
  duration: 60,
  date: "Mon Jan 01 1990",
  _id: "5fb5853f734231456ccb3b05"
} */
  const _id = request.params._id;
  // find user by id
  const user = users.find((user) => user._id === _id);
  if (user) {
    const username = user.username;
    const description = request.body.description;
    const duration = parseInt(request.body.duration);
    let date = new Date().toDateString();

    if (request.body.date) {
      date = new Date(request.body.date).toDateString();
    }

    const exercise = {
      _id: _id,
      username: username,
      date: date,
      duration: duration,
      description: description,
    };

    // add exercise to exercises array
    exercises.push(exercise);
    // console.log("exercises", exercises);
    // send user object
    respose.send(exercise);
  }
});

// /api/users/:_id/logs?[from][&to][&limit]
app.get("/api/users/:_id/logs", (request, response) => {
  /* 
    {
  username: "fcc_test",
  count: 1,
  _id: "5fb5853f734231456ccb3b05",
  log: [{
    description: "test",
    duration: 60,
    date: "Mon Jan 01 1990",
  }]
}
  */
  // console.log("request", request.params._id);

  const userId = request.params._id;
  // find user by id
  const user = users.find((user) => user._id === userId);
  if (user) {
    const username = user.username;
    // count number of exercises for user
    const exerciseById = exercises.filter(
      (exercise) => exercise._id === userId
    );
    const count = exerciseById.length;
    const fromDate = request.query.from;
    const toDate = request.query.to;
    const limit = request.query.limit;
    // console.log(fromDate);
    let log = exerciseById.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      };
    });

    // console.log("log", log);

    // console.log("date", new Date(exerciseById[0].date) );
    if (fromDate) {
      log = log.filter(
        (exercise) => new Date(exercise.date) >= new Date(fromDate)
      );
      console.log("from date", fromDate);
    }

    if (toDate) {
      log = log.filter(
        (exercise) => new Date(exercise.date) <= new Date(toDate)
      );
      // console.log("to date", toDate);
    }

    if (limit) {
      log = log.slice(0, limit);
    }

    const userLog = {
      _id: userId,
      username: username,
      count: count,
      log: log,
    };

    logs.push(userLog);
    // console.log("userLog", userLog);
    response.send(userLog);
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
