import axios from "axios"; // Importing Axios for making HTTP requests to the backend.
import { useState } from "react"; // Importing `useState` hook to manage the component's state.

const Create = () => {

    // Declaring state variables to hold the input values for movie title, year, and poster URL.
    const [title, setTitle] = useState(''); // State for the movie's title.
    const [year, setYear] = useState(''); // State for the movie's release year.
    const [poster, setPoster] = useState(''); // State for the movie's poster URL.

    // Function to handle form submission.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (which would reload the page).
        
        // Create a new movie object using the current state values.
        const movie = { title, year, poster };

        console.log(movie); // Log the movie object to the console for debugging.

        // Send a POST request to the backend API to create a new movie with the movie data.
        axios.post('http://localhost:4000/api/movies', movie)
            .then((res) => {
                console.log(res.data); // Log the server's response after the movie is created successfully.
            })
            .catch((err) => {
                console.error(err); // If there's an error, log it to the console.
            });
    }

    return (
        <div>
            <h3>Hello from create component!</h3> {/* Displaying a header to let the user know they are in the "Create" component. */}
            
            {/* The form to collect movie data from the user. */}
            <form onSubmit={handleSubmit}>
                
                {/* Input field for movie title. */}
                <div className="form-group">
                    <label>Add Movie Title: </label>
                    <input 
                        type="text" // This is a text input for the movie's title.
                        className="form-control" // Apply Bootstrap's form-control class for styling.
                        value={title} // Set the value of the input to the `title` state variable.
                        onChange={(e) => { setTitle(e.target.value) }} // Update the state when the user types in the input field.
                    />
                </div>

                {/* Input field for movie year. */}
                <div className="form-group">
                    <label>Add Movie Year: </label>
                    <input 
                        type="text" // This is a text input for the movie's release year.
                        className="form-control" // Apply Bootstrap's form-control class for styling.
                        value={year} // Set the value of the input to the `year` state variable.
                        onChange={(e) => { setYear(e.target.value) }} // Update the state when the user types in the input field.
                    />
                </div>

                {/* Input field for movie poster URL. */}
                <div className="form-group">
                    <label>Add Movie Poster: </label>
                    <input 
                        type="text" // This is a text input for the movie's poster URL.
                        className="form-control" // Apply Bootstrap's form-control class for styling.
                        value={poster} // Set the value of the input to the `poster` state variable.
                        onChange={(e) => { setPoster(e.target.value) }} // Update the state when the user types in the input field.
                    />
                </div>

                {/* Submit button to add the movie. */}
                <div>
                    <input 
                        type="submit" 
                        value="Add Movie" // The text displayed on the submit button.
                    />
                </div>
            </form>
        </div>
    );
}

export default Create; // Export the component to be used elsewhere in the application.
