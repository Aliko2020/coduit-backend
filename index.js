const express = require("express");
const cors = require("cors");
const connectdb = require(".//config/db");
const Router = require("./routes/feedRoute");
require("dotenv").config();

const Port = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.use("/", Router);

app.listen(Port, () => {
  console.log(`Server running on port: ${Port}`);
  connectdb();
});
