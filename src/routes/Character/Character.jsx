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
    <div className={styles.container}>
      <div className={styles.homeWrapper}>
        <Link className={styles.home} to="/">Back to list</Link>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>{character.name}</h1>
        <img className={styles.image} src={character.image} alt={character.name} />
        <p className={styles.subtitleId}>id: {character.id}</p>
        <p className={styles.subtitleGender}>gender: {character.gender.toLowerCase()}</p>
      </div>
      <div className={styles.slider}>
        {parseInt(id) > 1 && (
          <button className={styles.slideBack} onClick={handlePrevClick}>Back</button>
        )}
        {parseInt(id) < 506 && (
          <button className={styles.slideNext} onClick={handleNextClick}>Next</button>
        )}
      </div>
    </div>
  );
}
