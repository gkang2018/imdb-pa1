import React, {useEffect, useState} from 'react'
import { Button, ButtonGroup} from '@material-ui/core';
import TableComponent from './Table'
import { getToken } from '../utils/useLocalStorage';

const Home = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isMovies, setIsMovies] = useState(false);

    const fetchMovies = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-movies", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {movies, cols} = await response.json();
            setIsMovies(true);
            setData(movies);
            setColumns(cols);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchActors = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-actors", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {actors, cols} = await response.json();
            setIsMovies(false);
            setData(actors);
            setColumns(cols);
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <ButtonGroup>
                <Button onClick={fetchMovies}>View all movies</Button>
                <Button onClick={fetchActors}>View all actors</Button>
            </ButtonGroup>
            <TableComponent columns={columns} rows={data} isMovies = {isMovies}/>
        </div>
    )
}

export default Home