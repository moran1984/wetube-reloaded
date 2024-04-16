import express from "express";

const PORT = 4000;

const app = express(); // 시작

const handleHome = (req, res) => {
  return res.send("hi i still love you");
};

const handleLogin = (req, res) => {
  return res.send("Login here");
};

app.get("/", handleHome);
app.get("/login", handleLogin);
const handleListening = () =>
  console.log(`❤️  Server is listening on port ${PORT} 😘`);

app.listen(PORT, handleListening); // 끝
