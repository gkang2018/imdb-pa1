import React, {useEffect, useState} from 'react'
import { Button, ButtonGroup, Snackbar} from '@material-ui/core';
import TableComponent from './Table'
import { getToken } from '../utils/useLocalStorage';
import { useHistory } from 'react-router';

const Home = ({handleShowSnackbar}) => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isMovies, setIsMovies] = useState(false);
    const history = useHistory()

    const checkAuthToken = () => {
        const token = getToken();
        if (token === "" || token === null) {
            handleShowSnackbar(true, "Please log in again as your session has expired")
            history.push("/");
        }
    }

    useEffect(() => {
        checkAuthToken();
    }, [])


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
            console.log(error);
            handleShowSnackbar(true, "Unable to show movies")
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
            handleShowSnackbar(true, "Unable to fetch actors")
        }
    }

    const fetchLocations = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-locations", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {locations, cols} = await response.json();
            setIsMovies(false);
            setData(locations);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch locations")
        }
    }

    const fetchRoles = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-roles", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {roles, cols} = await response.json();
            setIsMovies(false);
            setData(roles);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch roles")

        }
    }

    const fetchSeries = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-series", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {series, cols} = await response.json();
            setIsMovies(false);
            setData(series);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch series")
        }
    }

    const fetchAwards = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-awards", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {awards, cols} = await response.json();
            setIsMovies(false);
            setData(awards);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch awards")
        }
    }


    const fetchGenres = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-genres", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {genres, cols} = await response.json();
            setIsMovies(false);
            setData(genres);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch genres")
        }
    }

    const fetchLikes = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-likes", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {likes, cols} = await response.json();
            setIsMovies(false);
            setData(likes);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch likes")
        }
    }


    return (
        <div>
            <ButtonGroup style={{marginTop: "5%", marginBottom: "5%", marginRight: "5%"}}>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchMovies}>View all Motion Pictures</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchSeries}>View all Series</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchActors}>View all actors</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchAwards}>View all awards</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchGenres}>View all genres</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchLikes}>View all likes</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchAwards}>View all awards</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchLocations}>View all locations</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchRoles}>View all roles</Button>
            </ButtonGroup>
            <TableComponent columns={columns} rows={data} isMovies = {isMovies}/>
        </div>
    )
}

export default Home