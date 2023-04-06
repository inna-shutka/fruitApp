import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const result = await axios.get('https://bobsburgers-api.herokuapp.com/characters');
      setCharacters(result.data);
    };
    fetchCharacters();
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Home</h1>
      <form>
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleInputChange} />
      </form>
      <ul>
        {filteredCharacters.map((character) => (
          <li key={character.id}>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
