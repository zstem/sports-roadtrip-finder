const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8888;

var selectedTeam;

const seriesSchema = new mongoose.Schema({
  MatchNumber: Number,
  RoundNumber: Number,
  DateUtc: Date,
  Location: String,
  HomeTeam: String,
  AwayTeam: String,
  Group: String,
  HomeTeamScore: Number,
  AwayTeamScore: Number
});


async function connectDatabase() {
  await mongoose.connect('mongodb+srv://admin:zaczac@cluster0.aiatvhz.mongodb.net/sports_trip_finder?retryWrites=true&w=majority');
}

connectDatabase();

var db = mongoose.connection;

db.once('open', () => console.log("Database Connection Successful!"));

app.get('/', async function (req, res) {
  res.send("main route");
})

app.get('/:team', async function (req, res) {
  selectedTeam = req.params.team;
  var series = mongoose.model('series', seriesSchema, selectedTeam);
  const query = await series.find({});
  res.json(query);
  console.log("/" + req.params.team);
})

app.get('/:team/:maxDistance', async function (req, res) {
  selectedTeam = req.params.team;
  var series = mongoose.model('series', seriesSchema, selectedTeam);
  for(let i = 0; i < req.params.maxDistance; i++){
    const query = await series.find({HomeTeam: teamLocationData.team.name = HomeTeam});
  }
  
  res.json(query);
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})



