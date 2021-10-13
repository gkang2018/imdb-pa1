const express = require('express');
const app = express();
const port = 8080; 
const AuthService = require('./services/AuthService');
const QueryService = require('./services/QueryService')
const bodyParser = require('body-parser');
const authMiddleware = require('./utils/auth-middleware');
app.use(bodyParser.urlencoded({extended: true}))


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