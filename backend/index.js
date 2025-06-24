const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

app.use(express.json());

//dummy database, array of objects;

let plants = [
    {id:1, name:'Neem', description: 'Good medicinal tree', img: 'neem.png'},
    {id:2, name: 'Tulsi', description: 'Sacred and healing', img: 'tulsi.png'},
    {id:3, name: 'Elephant Ears', description: 'Water-hating plant', img: 'elephantEars.png'},
    {id:4, name: 'Bougainvilia', description: 'PaperFlower Plant', img: 'Bougainvillia.png'},
  ]

// Dummy Data endpoint.
app.get('/api/plants', (req, res) =>{
  res.json(plants);
});

app.post('/api/plants', (req, res) =>{
  const { name, description, img } = req.body;
  
  if(!name || !description || !img){
    return res.status(400).json({error: 'name, description & img are required'});
  }

  // for generating a new ID.
  const nextId = plants.reduce((max, p) => Math.max(max, p.id), 0) + 1;
  
  const newPlant = { id:nextId, name, description, img };
  plants.push(newPlant);

  //201 means created.
  res.status(201).json(newPlant);
});

app.listen(port, ()=>{
  console.log(`Plant API running at https://localhost:${port}`);
});



