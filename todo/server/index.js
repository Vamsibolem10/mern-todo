const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require("axios")
require('dotenv').config();

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1:27017/todoapplication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);


// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a todo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating todo' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { text, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

app.get('/api/weather/:city', async (req, res) => {
  try {
      const city = req.params.city;
      const apiKey = '41c3c373d04e93a653d2ebb4f7b46c70'; 
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await axios.get(weatherURL);
      res.json(response.data);
  } catch (error) {
      console.error('❌ Weather API Error:', error.message);
      res.status(500).json({ message: '❌ Failed to fetch weather data', error: error.message });
  }

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});