const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

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

// read data
//http://localhost:8000
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});

// create data in app
// http://localhost:8000/create
/**
 * create data
 * {
 * name
 * email
 * mobileno
 * }
 */
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({
    success: true,
    messsage: "data saved",
    data: data,
  });
});

// upadate data in app
//localhost:8000/update
/**
 * {
 * id:""
 * name:""
 * email:""
 * mobile:
 * }
 */
http: app.put("/update", async (req, res) => {
  console.log(req.body);
  const { id, ...rest } = req.body;

  console.log(rest);
  const data = await userModel.updateOne({ _id: req.body.id }, rest);
  res.send({
    success: true,
    messsage: "data updated successfully",
    data: data,
  });
});

// delete data
// http://localhost:8000/delete
/**
 * 
 */
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({
    success: true,
    message: "data delete successfully",
    data: data,
  });
});

// database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/crudoperations")
  .then(() => {
    console.log("connect to db");
    app.listen(PORT, () => console.log("server is running"));
  })

  .catch((error) => console.log(error));
