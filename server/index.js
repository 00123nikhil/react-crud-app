const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

const PORT = process.env.PORT || 8000;

// schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
  },
  {
    timestamp: true,
  }
);

const userModel = mongoose.model("user", schemaData);

app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

app.post("/create", (req, res) => {
  console.log(req.body);
});

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crudoperations")
  .then(() => {
    console.log("connect to db");
    app.listen(PORT, () => console.log("server is running"));
  })

  .catch((error) => console.log(error));
