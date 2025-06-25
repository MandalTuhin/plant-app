const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const UserModel = require('./user');
const Plant = require('./model');

const app = express();
const port = 4000;



mongoose.connect('mongodb://localhost:27017/planttracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error :', err));


app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));


// Storage settings: save into ./uploads and keep original filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    // e.g. plant-<timestamp>.png
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });


// Dummy Data endpoint.
app.get('/api/plants', async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//middleware to protect posting plants

function authenticate(req, res, next){
  const auth  = req.headers.authorization?.split(' ')[1];
  if (!auth) return res.status(401).json({error : "No token"});

  jwt.verify(auth, 'your_jwt_secret', (err, payload) =>{
    if(err) return res.status(403).json({ error: 'Invalid token'});
    req.user = payload;
    next();
  });
}

app.post('/api/plants', authenticate, async (req, res) => {
  try {
    const { name, description, img } = req.body;
    const newPlant = await Plant.create({ name, description, img });
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// a new POST route for images

app.post(
  '/api/plants/:id/image',
  upload.single('image'),
  async (req, res) => {
    //req.file.filename is the random name multer gave it.
    const plant = await Plant.findByIdAndUpdate(
      req.params.id,
      { img: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json(plant);
  }
)


// for user login and registraton.

app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Missing username or password" });
    }

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({ 
      username, 
      password: hash 
      });

    return res
    .status(201)
    .json({ message: 'User created', userId: createdUser._id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))){
      return res.status(401).json({ error: 'Invalid credentials' });

    }
    // sign a token (keep your secret safe-later move to .env)

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      'your_jwt_secret',
      { expiresIn: '1h' },

    );

    res.json({ token });

  } catch (err) {
    return res.status(500).json({error : err.message});
  }
});


app.listen(port, () => {
  console.log(`Plant API running at https://localhost:${port}`);
});



