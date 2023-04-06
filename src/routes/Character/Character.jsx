import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Character.module.css';

export const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://bobsburgers-api.herokuapp.com/characters/${id}`)
      .then(response => setCharacter(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handlePrevClick = () => {
    const prevId = parseInt(id) - 1;
    navigate(`/character/${prevId}`);
  };

  const handleNextClick = () => {
    const nextId = parseInt(id) + 1;
    navigate(`/character/${nextId}`);
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>Id: {character.id}</p>
      <p>Gender: {character.gender}</p>
      <img src={character.image} alt={character.name} />
      <div>
        {parseInt(id) > 1 && (
          <button onClick={handlePrevClick}>Previous</button>
        )}
        <Link to="/">Home</Link>
        {parseInt(id) < 506 && (
          <button onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  );
}
