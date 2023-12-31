require('dotenv').config();
const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const router = require("./routes/index");
const connectDB = require("./db");
const mongoose = require("mongoose");
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));
app.use("/api", router);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});