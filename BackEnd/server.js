// Importing required dependencies
const express = require('express'); // Express framework for building the API.
const app = express(); // Creating an instance of the Express application.
const port = 4000; // Defining the port on which the server will run.

// Importing and setting up CORS (Cross-Origin Resource Sharing) middleware
const cors = require('cors'); // CORS middleware to enable cross-origin requests
app.use(cors()); // Allowing all cross-origin requests for simplicity

// Custom CORS headers middleware to ensure proper CORS headers are set
app.use(function(req, res, next) {
  // Set CORS headers to allow requests from any origin, with specified methods and headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Importing and configuring body-parser middleware to parse incoming request bodies
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose'); 
mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14'); 

// Defining the schema for the movie data to be stored in MongoDB
const movieSchema = new mongoose.Schema({
  title: String,
  year: String, 
  poster: String 
});

// Creating a model using the schema. The model will be used to interact with the 'myMovies' collection in MongoDB
const movieModel = new mongoose.model('myMovies', movieSchema);

// Route to fetch all movies from the database
app.get('/api/movies', async (req, res) => {
    // Query the database for all movies
    const movies = await movieModel.find({});
    // Send the movies data in the response with HTTP status 200 (OK)
    res.status(200).json({ movies });
});

// Route to fetch a single movie by its ID
app.get('/api/movie/:id', async (req, res) => {
  // Use the movie ID from the URL params (`req.params.id`) to fetch a single movie by its ID
  const movie = await movieModel.findById(req.params.id);
  // Send the movie data in the response
  res.json(movie);
});


// Route to create a new movie by sending a POST request with movie data in the body
app.post('/api/movies', async (req, res) => {
    console.log(req.body.title); // Log the title of the movie from the request body (for debugging)
    
    // Destructure the title, year, and poster from the request body
    const { title, year, poster } = req.body;

    // Create a new movie object using the values from the request body
    const newMovie = new movieModel({ title, year, poster });
    
    // Save the new movie object to the database
    await newMovie.save();

    // Respond with HTTP status 201 (Created) and send a message and the new movie's data
    res.status(201).json({ "message": "Movie Added!", Movie: newMovie });
});

// Route to update an existing movie by its ID (via PUT request)
app.put('/api/movie/:id', async (req, res) => {
  // Use `findByIdAndUpdate` to find the movie by ID and update it with the new data from the request body
  let movie = await movieModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
  // Send the updated movie data back in the response
  res.send(movie);
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); 
});

//Handle Delete
app.delete('/api/movie/:id', async (req, res) => {
  
  console.log('Deleting movie with ID:', req.params.id);
  const movie = await movieModel.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: "Movie deleted successfully", movie });
  
});

