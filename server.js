const express = require("express");
const mongoose = require("mongoose");
const redText = "\x1b[31m%s\x1b[0m";
require("dotenv").config();
const MONGODB_ENDPOINT =
  process.env.MONGODB_ENDPOINT ||
  console.log(redText, "You must have a Mongo Database endpoint.");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_ENDPOINT, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
  console.log("Connected to MongoDB Endpoint")
);
mongoose.connection.on("error", (err) =>
  console.log(`Mongoose default connection error: ${err}`)
);

// Use this to log mongo queries being executed!
mongoose.set("debug", true);

app.use(require("./routes"));

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
