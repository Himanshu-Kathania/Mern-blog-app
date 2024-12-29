const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/auth", require("../backend/routes/user.auth"));
// app.use("/api/auth", require("routes/posts"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongDb Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
