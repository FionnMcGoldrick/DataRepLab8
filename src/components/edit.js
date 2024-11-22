import React from 'react'; // Importing React library for JSX syntax.
import { useParams } from 'react-router-dom'; // Importing `useParams` hook to get route parameters.
import { useState, useEffect } from 'react'; // Importing `useState` for local state and `useEffect` for side effects.
import axios from 'axios'; // Importing Axios for making HTTP requests.
import { useNavigate } from "react-router-dom"; // Importing `useNavigate` hook to programmatically navigate between routes.

export default function Edit(props) {
  // Using the `useParams` hook to extract the `id` parameter from the route URL.
  let { id } = useParams();

  // Declaring state variables to store form input values.
  const [title, setTitle] = useState(""); // State to hold the title of the movie.
  const [year, setYear] = useState(""); // State to hold the release year of the movie.
  const [poster, setPoster] = useState(""); // State to hold the URL of the movie poster.
  
  const navigate = useNavigate(); // Using `useNavigate` hook to programmatically navigate to different routes.

  // The `useEffect` hook will run once the component is mounted or when the `id` value changes.
  useEffect(() => {
    // Making a GET request to fetch the movie details by `id`.
    axios.get('http://localhost:4000/api/movie/' + id)
      .then((response) => {
        // When the data is successfully fetched, update the state with the movie details.
        setTitle(response.data.title);
        setYear(response.data.year);
        setPoster(response.data.poster);
      })
      .catch((error) => {
        // Handling any errors that might occur during the request.
        console.log(error);
      });
  }, [id]); // The dependency array contains `id`, so the effect will re-run if `id` changes.

  // Handle form submission when the user edits the movie and submits the form.
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page on submit.

    // Create a new object containing the updated movie details.
    const newMovie = { id, title, year, poster };
    
    // Sending a PUT request to update the movie in the database using the `id` as a parameter.
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
      .then((res) => {
        // If the update is successful, log the response and navigate to the '/read' route.
        console.log(res.data);
        navigate('/read'); // Redirect to the '/read' route after successful update.
      });
  }

  return (
    <div>
      <h1> Hello From Edit Component </h1>
      
      {/* Form for editing the movie details. */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* Input field for editing the movie title */}
          <label>Edit Movie Title: </label>
          <input
            type="text"
            className="form-control" // Apply Bootstrap styling
            value={title} // Set the input value to the `title` state.
            onChange={(e) => setTitle(e.target.value)} // Update state when user types.
          />
        </div>

        <div className="form-group">
          {/* Input field for editing the release year */}
          <label>Edit Release Year: </label>
          <input
            type="text"
            className="form-control" // Apply Bootstrap styling
            value={year} // Set the input value to the `year` state.
            onChange={(e) => setYear(e.target.value)} // Update state when user types.
          />
        </div>

        <div className="form-group">
          {/* Input field for editing the poster URL */}
          <label>Poster URL: </label>
          <input
            type="text"
            className="form-control" // Apply Bootstrap styling
            value={poster} // Set the input value to the `poster` state.
            onChange={(e) => setPoster(e.target.value)} // Update state when user types.
          />
        </div>

        <div className="form-group">
          {/* Submit button to submit the form */}
          <input
            type="submit"
            value="Edit Movie"
            className="btn btn-primary" // Apply Bootstrap button styling
          />
        </div>
      </form>
    </div>
  );
}
