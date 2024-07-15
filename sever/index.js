const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const uri = 'mongodb+srv://nattapongryan230707:14936sw3m40402@cluster0.paw33za.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const flashcardRoutes = require('./routes/Flashcard');

app.use('/flashcard', flashcardRoutes);

const flashcardRoutes_official = require('./routes/Flashcard_official');
app.use('/flashcard_offcial', flashcardRoutes_official);

const quiz_routes = require('./routes/quiz')
app.use('/quiz', quiz_routes);

const UserRoutes  = require('./routes/users')
app.use('/user', UserRoutes );

const GetroutesUser = require('./routes/getuser')
app.use('/getdata', GetroutesUser );