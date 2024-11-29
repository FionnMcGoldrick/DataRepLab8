import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {
  const [movies, setMovies] = useState([]);

  // Reload function to fetch movie data
  const Reload = () => {
    console.log("Reloading movie data...");
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error reloading data:", error);
      });
  };

  // useEffect to fetch movie data on initial render
  useEffect(() => {
    Reload();  // Automatically fetch data when the component mounts
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <h3>Hello from read component!</h3>
      {/* Optionally, add a button to trigger reload manually */}
      <button onClick={Reload}>Reload Movies</button>
      <Movies myMovies={movies} />
    </div>
  );
}

export default Read;
