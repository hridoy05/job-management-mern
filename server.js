import http from "http";
import app from "./app.js";
import { mongoConnect } from "./db/connect.js";

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoConnect();
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
