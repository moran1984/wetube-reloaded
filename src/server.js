import express from "express";

const PORT = 4000;

const app = express(); // 시작

app.get("/", () => console.log("Somebody is trying to go home."));

const handleListening = () =>
  console.log(`❤️  Server is listening on port ${PORT} 😘`);

app.listen(PORT, handleListening); // 끝
