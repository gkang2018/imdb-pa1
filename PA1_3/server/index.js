const express = require('express');
const app = express();
const port = 8080; 
const AuthService = require('./services/AuthService');
const QueryService = require('./services/QueryService')
const bodyParser = require('body-parser');
const authMiddleware = require('./utils/auth-middleware');
app.use(bodyParser.urlencoded({extended: true}))


app.get("/initialize-db", async (req, res) => {
    try {
        const didInitialize = await QueryService.initializeDB();
        return res.status(200).send({message: "Initialized DB", didInitialize: didInitialize})
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: "Unable to initialize the database", didInitialize: false})
    }
})


app.get("/fetch-movies", authMiddleware.checkToken, async (req, res) => {
    try {
        const [movies, cols] = await QueryService.fetchMovies();
        return res.status(200).send({message: "Successfully fetched movies", movies: movies, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch movies"})
    }
})

app.get("/fetch-actors", authMiddleware.checkToken, async (req, res) => {
    try {
        const [actors, cols] = await QueryService.fetchActors();
        return res.status(200).send({message: "Successfully fetched actors", actors: actors, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch actors"})
    }
})

app.get("/fetch-locations", authMiddleware.checkToken, async (req, res) => {
    try {
        const [locations, cols] = await QueryService.fetchLocations();
        return res.status(200).send({message: "Successfully fetched locations", locations: locations, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch locations"})
    }
})

app.get("/fetch-roles", authMiddleware.checkToken, async (req, res) => {
    try {
        const [roles, cols] = await QueryService.fetchRoles();
        return res.status(200).send({message: "Successfully fetched roles", roles: roles, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch roles"})
    }
})


app.get("/fetch-series", authMiddleware.checkToken, async (req, res) => {
    try {
        const [series, cols] = await QueryService.fetchSeries();
        return res.status(200).send({message: "Successfully fetched series", series: series, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch series"})
    }
})

app.get("/fetch-awards", authMiddleware.checkToken, async (req, res) => {
    try {
        const [awards, cols] = await QueryService.fetchAwards();
        return res.status(200).send({message: "Successfully fetched awards", awards: awards, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch awards"})
    }
})

app.get("/fetch-users", authMiddleware.checkToken, async (req, res) => {
    try {
        const [users, cols] = await QueryService.fetchUsers();
        return res.status(200).send({message: "Successfully fetched users", users: users, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch users"})
    }
})


app.get("/fetch-likes", authMiddleware.checkToken, async (req, res) => {
    try {
        const [likes, cols] = await QueryService.fetchLikes();
        return res.status(200).send({message: "Successfully fetched likes", likes: likes, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch likes"})
    }
})


app.get("/fetch-genres", authMiddleware.checkToken, async (req, res) => {
    try {
        const [genres, cols] = await QueryService.fetchGenres();
        return res.status(200).send({message: "Successfully fetched genres", genres: genres, cols: cols})
    } catch (error) {
        return res.status(400).send({message: "Unable to fetch genres"})
    }
})

app.post("/like-movie", authMiddleware.checkToken, async (req, res) => {
    try {
        const user = await req.user;
        const isSuccessful = await QueryService.likeMovie(user.email, req.body.mpid);
        return res.status(200).send({message: "Successfully liked movie"})
    } catch (error) {
        return res.status(400).send({message: "Unable to like movie"})
    }
})

app.post("/find-mp-by-name", authMiddleware.checkToken, async(req, res) => {
    try {
        const [mps, cols] = await QueryService.findMPByName(req.body.query);
        return res.status(200).send({message: "Found motion pictures", mps: mps, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find motion picture by name"})
    }
})

app.post("/find-likes-by-email", authMiddleware.checkToken, async(req, res) => {
    try {
        const [likes, cols] = await QueryService.findLikesByEmail(req.body.query);
        return res.status(200).send({message: "Found motion pictures", likes: likes, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find motion picture by name"})
    }
})

app.post("/find-mp-by-location", authMiddleware.checkToken, async(req, res) => {
    try {
        const [mps, cols] = await QueryService.findMPByLocation(req.body.query);
        return res.status(200).send({message: "Found motion pictures", mps: mps, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find motion picture by location"})
    }
})  

app.post("/find-director-by-zip", authMiddleware.checkToken, async(req, res) => {
    try {
        const [directors, cols] = await QueryService.findDirectorByZipcode(req.body.query);
        return res.status(200).send({message: "Found directors", directors: directors, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find directors by zipcode"})
    }
})  

app.post("/find-people-k-awards", authMiddleware.checkToken, async(req, res) => {
    try {
        const [people, cols] = await QueryService.findPeopleReceivedKAwards(req.body.query);
        return res.status(200).send({message: "Found people", people: people, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find people who received k awards"})
    }
})  

app.post("/find-youngest-oldest-actor", authMiddleware.checkToken, async(req, res) => {
    try {
        const [actors, cols] = await QueryService.findYoungestAndOldest();
        return res.status(200).send({message: "Found actors", actors: actors, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find youngest and oldest actors"})
    }
})


app.post("/find-producers-budget-boxOffice", authMiddleware.checkToken, async(req, res) => {
    try {
        const [producers, cols] = await QueryService.findProducersByBudgetAndBoxOffice(req.body.x, req.body.y);
        return res.status(200).send({message: "Found producers by budget and box office", producers: producers, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find producers by budget and box office"})
    }
})

app.post("/find-people-mult-roles", authMiddleware.checkToken, async(req, res) => {
    try {
        const [people, cols] = await QueryService.findPeopleMultRoles(req.body.query);
        return res.status(200).send({message: "Found people with multiple roles", people: people, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find people with multiple roles"})
    }
})

app.post("/find-top-two-thrillers", authMiddleware.checkToken, async(req, res) => {
    try {
        const [movies, cols] = await QueryService.findTopTwoThrillers();
        return res.status(200).send({message: "Found top 2 thrillers", movies: movies, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find top two thrillers"})
    }
})


app.post("/find-movies-likes-ages", authMiddleware.checkToken, async(req, res) => {
    try {
        const [movies, cols] = await QueryService.findMoviesByLikesAndAge(req.body.x, req.body.y);
        return res.status(200).send({message: "Found movies by likes and ages", movies: movies, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find movies by likes and age"})
    }
})


app.post("/find-actors-marvel-warner", authMiddleware.checkToken, async(req, res) => {
    try {
        const [actors, cols] = await QueryService.findActorsBothMarvelWarner();
        return res.status(200).send({message: "Found actors in both Marvel and Warner", actors: actors, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find actors in both Marvel and Warner"})
    }
})


app.post("/find-movies-higher-comedy", authMiddleware.checkToken, async(req, res) => {
    try {
        const [movies, cols] = await QueryService.findMoviesHigherRatingComedy();
        return res.status(200).send({message: "Found movies higher rated than comedy", movies: movies, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find movies higher rated than comedy"})
    }
})


app.post("/find-top-five-with-most-people", authMiddleware.checkToken, async(req, res) => {
    try {
        const [movies, cols] = await QueryService.findTop5WithMostPeople();
        return res.status(200).send({message: "Found top 5 movies with most people", movies: movies, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find top 5 movies with most people"})
    }
})



app.post("/find-same-bday-actors", authMiddleware.checkToken, async(req, res) => {
    try {
        const [actors, cols] = await QueryService.findSameBirthDayActors();
        return res.status(200).send({message: "Found actors with same birthday", actors: actors, cols: cols })
    } catch (error) {
        return res.status(400).send({message: "Unable to find actors with same birthday"})
    }
})



app.post("/signup", async (req, res) => {
    try {
        const email = req.body.email; 
        const name = req.body.name;
        const age = req.body.age;
        if (!email || !name || !age) {
            return res.status(400).send({message: "Please fill in all the required fields"})
        }
        const token = await AuthService.signup(email, name, age); 
        return res.status(200).send({message: "Successfully signed up", token: token})   
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) {
            return res.status(400).send({message: "Please provide an email"})
        }
        const token = await AuthService.login(email); 
        return res.status(200).send({message: "Successfully logged in", token: token})   
    } catch (error) {
        return res.status(400).send({message: error.message})
    }
})


app.listen(port, () => {
    console.log("Listening on port 8080");
})