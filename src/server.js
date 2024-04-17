import express from "express";

const PORT = 4000;

const app = express(); // 시작

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

app.get("/", logger, handleHome);

const handleListening = () =>
  console.log(`❤️  Server is listening on port ${PORT} 😘`);

app.listen(PORT, handleListening); // 끝
