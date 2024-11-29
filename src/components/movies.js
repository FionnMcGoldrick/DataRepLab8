import MovieItem from "./movieitem";

// Movies component that accepts props and renders a list of MovieItem components
const Movies = (props) => {
    return (
        <>
            {/* Mapping through the array of movies passed in via props */}
            {props.myMovies.map((movie) => (
                <MovieItem
                    myMovie={movie} // Passing each movie object to MovieItem
                    key={movie._id} // Using movie's _id as the unique key for each item
                    Reload={props.ReloadData} // Passing ReloadData function to reload movie list if necessary
                />
            ))}
        </>
    );
}

export default Movies;
