const express = require("express");
const { connection } = require("./config/db");
require("dotenv").config();
const { UserRoute } = require("./routes/UserRoute");
const { ProductRoute } = require("./routes/ProductRoute");
const { CartRoute } = require("./routes/CartRoute");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  res.send({ Message: "WELCOME" });
});

app.use("/user", UserRoute);
app.use("/product", ProductRoute);
app.use("/cart", CartRoute);
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
    console.log("Error getting while connecting to the server");
  }
});
