import 'dotenv/config'
import express from "express";
    
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

// Add a new tea
app.post("/tea", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// Get all teas
app.get("/tea", (req, res) => {
  res.status(200).send(teaData);
});

// Get a tea by ID
app.get("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (tea) {
    res.status(200).send(tea);
  } else {
    res.status(404).send({ message: "Tea not found" });
  }
});

// Update a tea by ID
app.put("/tea/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (tea) {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  } else {
    res.status(404).send({ message: "Tea not found" });
  }
});

// Delete a tea by ID
app.delete("/tea/:id", (req, res) => {
  const teaIndex = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (teaIndex !== -1) {
    const deletedTea = teaData.splice(teaIndex, 1);
    res.status(200).send(deletedTea[0]);
  } else {
    res.status(404).send({ message: "Tea not found" });
  }
});

/*
app.get('/about', (req, res) => {
    res.send('About Us');
});
app.get('/contact', (req, res) => {
    res.send('Contact Us');
});
*/
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}...`);
});

/* using port just like that is not recommended in production it wont work when you are trying to deploy your app
For that you can use npm install dotenv --save
and then create a .env file in the root directory of your project and add PORT=3000
Then you can use process.env.PORT in your code
or
require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

*/
