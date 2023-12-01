const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const { UserRoute } = require("./routes/UserRoute");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  res.send({ Message: "API is working" });
});

app.use("/user", UserRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
    console.log("Error getting while connecting to the server");
  }
});