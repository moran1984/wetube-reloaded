import express from "express";

const PORT = 4000;

const app = express(); // 시작

const gossipMiddleware = (req, res, next) => {
  console.log(`Someone is going to ${req.url}`);
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

const handleLogin = (req, res) => {
  return res.send({ message: "Login here" });
};

app.get("/", gossipMiddleware, handleHome);
app.get("/login", handleLogin);
const handleListening = () =>
  console.log(`❤️  Server is listening on port ${PORT} 😘`);

app.listen(PORT, handleListening); // 끝
