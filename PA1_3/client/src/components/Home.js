import React, {useEffect, useState} from 'react'
import { Button, ButtonGroup, Snackbar, TextField} from '@material-ui/core';
import SearchBar from "./SearchBar"
import TableComponent from './Table'
import { getToken } from '../utils/useLocalStorage';
import { useHistory } from 'react-router';

const Home = ({handleShowSnackbar, handleLogin}) => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [isMovies, setIsMovies] = useState(false);
    const [parameterizedState, setState] = useState({
        queryMotionPicName: "",
        queryLikesWithEmail: "",
        queryMPByLocation: "",
        queryDirectorByZip: "",
        queryPeopleKAwards: "", 
        queryProducersBudgetBox: "",
        queryPeopleMultRoleRatingK: "",
        queryMoviesLikesAndAge: "",
    })
    const history = useHistory();

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

    const fetchUsers = async () => {
        try {
            const token = getToken();
            const response = await fetch("/fetch-users", {
                method: "GET",
                headers: {
                    "Authorization": token
                }
            });
            const {users, cols} = await response.json();
            setIsMovies(false);
            setData(users);
            setColumns(cols);
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, "Unable to fetch users")
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

    const handleInputChange = (key, e) => {
        setState((prevState) => ({
            ...prevState,
            [key]: e.target.value
        }))
    }

    const findMotionPicByName = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-mp-by-name", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryMotionPicName
                    })
                });
                const {mps, cols} = await response.json();
                if (mps.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch motion pic with query " + parameterizedState.queryMotionPicName);
                }
                setIsMovies(false);
                setData(mps);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }
    }


    const findLikesByEmail = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-likes-by-email", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryLikesWithEmail
                    })
                });
                const {likes, cols} = await response.json();
                if (likes.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch likes with query " + parameterizedState.queryLikesWithEmail);
                }
                setIsMovies(false);
                setData(likes);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }
    }


    const findMPByLocation = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-mp-by-location", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryMPByLocation
                    })
                });
                const {mps, cols} = await response.json();
                if (mps.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch mps with query " + parameterizedState.queryMPByLocation);
                }
                setIsMovies(false);
                setData(mps);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }
    }


    const findDirectorByZipcode = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-director-by-zip", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryDirectorByZip
                    })
                });
                const {directors, cols} = await response.json();
                if (directors.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch directors with query " + parameterizedState.queryDirectorByZip);
                }
                setIsMovies(false);
                setData(directors);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }


    const findPeopleKAwards = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-people-k-awards", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryPeopleKAwards
                    })
                });
                const {people, cols} = await response.json();
                if (people.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch people with query " + parameterizedState.queryPeopleKAwards);
                }
                setIsMovies(false);
                setData(people);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }
    

    const findYoungestAndOldest = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-youngest-oldest-actor", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {actors, cols} = await response.json();
                if (actors.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch youngest and oldest actors");
                }
                setIsMovies(false);
                setData(actors);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }


    const findProducersByBudgetAndBoxOffice = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const [x,y] = parameterizedState.queryProducersBudgetBox.split(" ")
                const response = await fetch("/find-producers-budget-boxOffice", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        x: x,
                        y: y,
                    })
                });
                const {producers, cols} = await response.json();
                if (producers.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch producers");
                }
                setIsMovies(false);
                setData(producers);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }



    const findPeopleMultRolesRatingMoreThanK = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-people-mult-roles", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        query: parameterizedState.queryPeopleMultRoleRatingK
                    })
                });
                const {people, cols} = await response.json();
                if (people.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch people");
                }
                setIsMovies(false);
                setData(people);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }
    

    const findTopTwoThrillers = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-top-two-thrillers", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {movies, cols} = await response.json();
                if (movies.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch movies");
                }
                setIsMovies(false);
                setData(movies);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }


    const findMoviesByLikesAndAge = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                console.log(parameterizedState.queryMoviesLikesAndAge)
                const [x,y] = parameterizedState.queryMoviesLikesAndAge.split(" ")
                const response = await fetch("/find-movies-likes-ages", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    },
                    body: new URLSearchParams({
                        x: x,
                        y: y,
                    })
                });
                const {movies, cols} = await response.json();
                if (movies.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch movies");
                }
                setIsMovies(false);
                setData(movies);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }



    const findActorsMarvelAndWarner = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-actors-marvel-warner", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {actors, cols} = await response.json();
                if (actors.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch actors");
                }
                setIsMovies(false);
                setData(actors);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }

    const findMoviesHigherRatingComedy = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-movies-higher-comedy", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {movies, cols} = await response.json();
                if (movies.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch movies");
                }
                setIsMovies(false);
                setData(movies);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }

    const findTop5MoviesMostPeople = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-top-five-with-most-people", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {movies, cols} = await response.json();
                if (movies.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch movies");
                }
                setIsMovies(false);
                setData(movies);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
        }   
    }

    const findSameBirthDayActors = async () => {
        try {
            const token = getToken();
            if (token !== "") {
                const response = await fetch("/find-same-bday-actors", {
                    method: "POST",
                    headers: {
                        "Authorization": token
                    }
                });
                const {actors, cols} = await response.json();
                if (actors.length === 0 || cols.length === 0) {
                    handleShowSnackbar(true, "Unable to fetch actors");
                }
                setIsMovies(false);
                setData(actors);
                setColumns(cols);
            }
            else {
                handleShowSnackbar(true, "Please login again as session has expired");
                history.push("/login")
            }
        } catch (error) {
            console.log(error)
            handleShowSnackbar(true, error.message)
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
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchUsers}>View all users</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchLikes}>View all likes</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchAwards}>View all awards</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchLocations}>View all locations</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={fetchRoles}>View all roles</Button>
            </ButtonGroup>
            <ButtonGroup style={{marginBottom: "5%", marginRight: "5%"}}>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findYoungestAndOldest}>Find youngest and oldest</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findTopTwoThrillers}>Find top 2 thrillers in Boston</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findActorsMarvelAndWarner}>Find actors in Marvel and Warner</Button>
            </ButtonGroup>
            <ButtonGroup style={{marginBottom: "1%", marginRight: "5%"}}>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findMoviesHigherRatingComedy}>Find mps higher avg rating than comedy</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findTop5MoviesMostPeople}>Find top 5 movies with the highest number of people playing a role</Button>
                <Button style={{marginRight: "1%"}} variant="contained" color="primary" onClick={findSameBirthDayActors}>Find actors with the same birthday</Button>
            </ButtonGroup>
            <ButtonGroup style={{marginTop: "5%", marginBottom: "5%", marginRight: "5%"}}>
                <SearchBar placeholder={"Search Motion Picture by Name"} keyName = {"queryMotionPicName"} handleSubmit={findMotionPicByName} onChange={handleInputChange} />
                <SearchBar placeholder={"Search User's likes by email"} keyName = {"queryLikesWithEmail"} handleSubmit={findLikesByEmail} onChange={handleInputChange} />
                <SearchBar placeholder={"Search Motion Picture by location"} keyName = {"queryMPByLocation"} handleSubmit={findMPByLocation} onChange={handleInputChange} />
            </ButtonGroup>
            <ButtonGroup style={{marginBottom: "5%", marginRight: "5%"}}>
                <SearchBar placeholder={"Search TV Director by zip"} keyName = {"queryDirectorByZip"} handleSubmit={findDirectorByZipcode} onChange={handleInputChange} />
                <SearchBar placeholder={"Search People Received K awards"} keyName = {"queryPeopleKAwards"} handleSubmit={findPeopleKAwards} onChange={handleInputChange} />
                <SearchBar placeholder={"Search Producers Budget Box Office"} keyName = {"queryProducersBudgetBox"} handleSubmit={findProducersByBudgetAndBoxOffice} onChange={handleInputChange} />
            </ButtonGroup>
            <ButtonGroup style={{marginBottom: "5%", marginRight: "5%"}}>
                <SearchBar placeholder={"People with multiple roles in movies with rating more than k"} keyName = {"queryPeopleMultRoleRatingK"} handleSubmit={findPeopleMultRolesRatingMoreThanK} onChange={handleInputChange} />
                <SearchBar placeholder={"Search Movies by likes and age"} keyName = {"queryMoviesLikesAndAge"} handleSubmit={findMoviesByLikesAndAge} onChange={handleInputChange} />
            </ButtonGroup>
            <TableComponent columns={columns} rows={data} isMovies = {isMovies} handleShowSnackbar={handleShowSnackbar} />
        </div>
    )
}

export default Home