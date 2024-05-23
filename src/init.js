import "dotenv/config";
import "./db";
import "./models/Video";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`❤️  Server is listening on port ${PORT} 😘`);

app.listen(PORT, handleListening);
