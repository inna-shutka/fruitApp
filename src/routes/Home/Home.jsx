import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IconOne, IconTwo } from '../Icon/Icon';
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
        <>
        <div className={styles.container}>
            <h1 className={styles.title}>Bob's Burgers</h1>
            <header className={styles.header}>
                <IconOne className={styles.imageOne}></IconOne>
                <input 
                    className={styles.search}
                    type="search" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                />
                <IconTwo className={styles.imageTwo}></IconTwo>
            </header>
            <ul className={styles.list}>
                {filteredCharacters.map((character) => (
                    <li 
                        className={styles.listItem}
                        key={character.id}
                    >
                        <Link 
                            className={styles.link}
                            to={`/character/${character.id}`}>
                                {character.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};
