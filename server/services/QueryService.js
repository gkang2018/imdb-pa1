// Initialize SQL Database
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_1',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Takes in MySQL rows and converts into array of objects
const rowParser = (rows) => {
    let ret = []
    // Each individual row
    rows.forEach(row => {
        let currentRow = {}
        for (key in row) {
            currentRow[key] = row[key]
        }
        ret.push(currentRow)
    })
    return ret;
}

const extractColumns = (rows) => {
    const colNames = new Set();
    rows.forEach(row => {
        for (property in row) {
            colNames.add(property);
        }
    })
    return [...colNames];
}


const fetchMovies = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM MotionPicture`, []);
        if (rows.length === 0) {
            console.log('No movies found');
            return null
        }
        else {
            const movies = rowParser(rows);
            const columnNames = extractColumns(movies);
            return [movies, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


const fetchActors = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM People`, []);
        if (rows.length === 0) {
            console.log('No actors found');
            return null
        }
        else {
            const actors = rowParser(rows);
            const columnNames = extractColumns(actors);
            return [actors, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchLocations = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Location`, []);
        if (rows.length === 0) {
            console.log('No locations found');
            return null
        }
        else {
            const locations = rowParser(rows);
            const columnNames = extractColumns(locations);
            return [locations, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchRoles = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Role`, []);
        if (rows.length === 0) {
            console.log('No locations found');
            return null
        }
        else {
            const locations = rowParser(rows);
            const columnNames = extractColumns(locations);
            return [locations, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchSeries = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Series`, []);
        if (rows.length === 0) {
            console.log('No series found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Series`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
        }
        else {
            const series = rowParser(rows);
            const columnNames = extractColumns(series);
            return [series, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchAwards = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Award`, []);
        if (rows.length === 0) {
            console.log('No awards found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Award`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
        }
        else {
            const awards = rowParser(rows);
            const columnNames = extractColumns(awards);
            return [awards, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


const fetchGenres = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Genre`, []);
        if (rows.length === 0) {
            console.log('No genres found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Genre`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
        }
        else {
            const genres = rowParser(rows);
            const columnNames = extractColumns(genres);
            return [genres, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


const fetchLikes = async () => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Likes`, []);
        if (rows.length === 0) {
            console.log('No likes found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Likes`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
        }
        else {
            const likes = rowParser(rows);
            const columnNames = extractColumns(likes);
            return [likes, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchUser = async (email) => {
    try {
        const [rows, fields] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [email]);
        if (rows.length === 0) {
            console.log('No user found');
            return null
        }
        else {
            const user = rowParser(rows)[0];
            return user
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const signupUser = async (email, name, age) => {
    try {
        // fetch user and see if exists
        const user = await fetchUser(email);
        if (!user) {
            const [results, errors] = await pool.query(`INSERT INTO Users (email, name, age) VALUES (?, ?, ?)`, [email, name, age]);
            return true;
        }
        else {
            throw new Error("User is already signed up.")
        }
    }
    catch(error) {
        throw error;
    }
}

const loginUser = async (email) => {
    try {
        // fetch user and see if exists
        const user = await fetchUser(email);
        return !user ? null : user
    }
    catch(error) {
        throw error;
    }
}



module.exports = {
    fetchUser: fetchUser, 
    signupUser: signupUser, 
    loginUser: loginUser, 
    fetchMovies: fetchMovies,
    fetchActors: fetchActors, 
    fetchLocations: fetchLocations, 
    fetchRoles: fetchRoles,
    fetchSeries: fetchSeries,
    fetchAwards: fetchAwards,
    fetchGenres: fetchGenres,
    fetchLikes: fetchLikes,
}