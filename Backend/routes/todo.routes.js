const express = require("express");
const { todoModel } = require("../models/todo.models");
const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
  try {
    let data = await todoModel.find();
    res.status(200).send({ msg: "Task fetched successfully", AllTask: data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "Failed to get task!" });
  }
});

todoRouter.post("/post", async (req, res) => {
  const payload = req.body;
  try {
    let new_post = new todoModel(payload);
    await new_post.save();
    res
    .status(200)
    .send({ msg: "Task added successfully", newTask: new_post });

  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Failed to add new task!" });
  }
});

todoRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
    const updatedTask=await todoModel.findByIdAndUpdate({ _id: id }, payload);
    res
    .status(200)
    .send({ msg: "Task updated successfully!" });

  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Failed to update task!" });
  }
});

todoRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await todoModel.findByIdAndDelete({ _id: id });
    res.send({ message: `task deleted!` });
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: "Failed to delete task!" });
  }
});

module.exports = { todoRouter };
