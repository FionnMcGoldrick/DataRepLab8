import { useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from "axios";

const MovieItem = (props) => {

  // Optional debugging log - can be removed in production
  useEffect(() => {
    console.log("Movie Item:", props.mymovie);
  }, [props.mymovie]);

  const handleDelete = (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      axios.delete('http://localhost:4000/api/movie/' + props.mymovie._id)
        .then(() => {
          console.log('Movie deleted successfully');
          // Optionally trigger a parent component to remove this item from the list
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>{props.mymovie.title}</Card.Header>
        <Card.Body>
          <blockquote className="blockquote mb-0">
            <img src={props.mymovie.poster} alt={props.mymovie.title} style={{ width: '100%', height: 'auto' }} />
            <footer>{props.mymovie.year}</footer>
          </blockquote>
        </Card.Body>
        <Link className="btn btn-primary" to={"/edit/" + props.mymovie._id}>Edit</Link>
        <br />
        <Button className="btn btn-danger" onClick={handleDelete}>Delete</Button>
      </Card>
    </div>
  );
};

export default MovieItem;
