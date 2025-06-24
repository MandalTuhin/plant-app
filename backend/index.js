const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

// Dummy Data endpoint.
app.get('/api/plants', (req, res) =>{
  res.json([
    {id:1, name:'Neem', description: 'Good medicinal tree', img: 'neem.png'},
    {id:2, name: 'Tulsi', description: 'Sacred and healing', img: 'tulsi.png'},
    {id:3, name: 'Elephant Ears', description: 'Water-hating plant', img: 'elephantEars.png'},
    {id:3, name: 'Bougainvilia', description: 'PaperFlower Plant', img: 'Bougainvillia.png'},
  ]);
});

app.listen(port, ()=>{
  console.log(`Plant API running at https://localhost:${port}`);
});



