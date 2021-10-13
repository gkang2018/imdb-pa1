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
        const [rows, fields] = await pool.query(`SELECT * FROM Users`, []);
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
        const [rows, fields] = await pool.query(`SELECT * FROM Users`, []);
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
    fetchActors: fetchActors
}