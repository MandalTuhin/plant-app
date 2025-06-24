const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


const Plant = require('./model');

const app = express();
const port = 4000;



mongoose.connect('mongodb://localhost:27017/plantracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Mongo connection error :', err));

app.use(cors());
app.use(express.json());

// Dummy Data endpoint.
app.get('/api/plants', async(req, res) =>{
  try{
    const plants  = await Plant.find();
    res.json(plants);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/plants', async(req, res) =>{
  try{
    const { name, description, img } = req.body;
    const newPlant = await Plant.create({ name, description, img });
    res.status(201).json(newPlant);
  } catch(err){
    res.status(400).json({error: err.message});
  }
});

app.listen(port, ()=>{
  console.log(`Plant API running at https://localhost:${port}`);
});



