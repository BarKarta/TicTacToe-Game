"use strict";
///////////////
import express, { urlencoded } from "express";
import { Match } from "./Classes/Match.js";
import { Player } from "./Classes/Player.js";
const app = express();
app.use(urlencoded({ extended: true }));

const PORT = 3000;
const matchesMap = new Map();

app.post("/StartGame", (req, res) => {
  let matchID = generateRandomNumber();
  while (!matchesMap.has(matchID)) {
    matchID = generateRandomNumber();
    matchesMap.set(matchID, new Match(req.body.playerID, matchID));
  }
  res.status(200).json(matchID);
});

app.post("/joinGame/", (req, res) => {
  const { matchID, playerID } = req.body;
  const match = matchesMap.get(Number(matchID));

  if (match) {
    match.addPlayerCircle(new Player(playerID));
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.post("/play", (req, res) => {
  const { matchID, playerID, location } = req.body;
  const match = matchesMap.get(Number(matchID));
  if (match) {
    const play = match.playGame(playerID, location);
    if (play) {
      if (play === true) {
        res.sendStatus(200);
      } else {
        res.status(200).json(play);
      }
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

const generateRandomNumber = () => {
  const min = 10000;
  const max = 99999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
