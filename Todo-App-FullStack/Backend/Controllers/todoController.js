const Todo = require('../Models/Todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.send(todos);
};

exports.createTodo = async (req, res) => {
  const todo = new Todo({ ...req.body, userId: req.userId });
  await todo.save();
  res.status(201).send(todo);
};

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!todo) return res.status(404).send({ error: 'Todo not found' });
  res.send(todo);
};

exports.deleteTodo = async (req, res) => {
  const result = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  if (!result) return res.status(404).send({ error: 'Todo not found' });
  res.send({ message: 'Todo deleted' });
};