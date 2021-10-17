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