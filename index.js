import express from "express";
import { todos } from "./data/todos";

const app = express();

app.use(express.json());
// We can also use body-parser package change serialized data
// app.use(bodyParser.json());

// Process All Requests
app.all("/", (req, res) => {
  res.send("I am UP");
});

// READ
app.get("/todos", (req, res) => {
  res.json({
    todos,
    status: "OK",
    length: todos?.length,
  });
});

// CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.json({
    message: "Successfully Created New Todo!",
  });
});

// EDIT
app.put("/todos/:id", (req, res) => {
  const todoParamId = Number(req.params.id);
  const updatedTodo = req.body;

  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...todos[todoIndex],
      ...updatedTodo,
    };
    res.status(201).json({
      message: "Todo Updated Successfully!",
    });
  } else {
    res.status(404).json({
      message: "No Todo Available with the Requested Id!",
    });
  }
});

// DELETE
app.delete("/todos/:id", (req, res) => {
  const todoParamId = Number(req.params.id);

  const todoIndex = todos.findIndex((td) => td.id === todoParamId);

  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);

    res.status(200).json({
      message: "Todo Deleted Successfully!",
    });
  } else {
    res.status(404).json({
      message: "No Todo Available with the Requested Id!",
    });
  }
});

// Listen
const PORT = 5111;

app.listen(PORT, () => {
  console.log("Server is Running on Port No: ", PORT);
});
