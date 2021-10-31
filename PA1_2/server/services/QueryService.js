// Initialize SQL Database
const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
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


const initializeDB = async () => {
    try {
        // Initialize Tables
        await pool.query(`CREATE DATABASE IF NOT EXISTS IMDB_PA1`);
        await pool.query(`USE IMDB_PA1`);
        await pool.query(`CREATE TABLE IF NOT EXISTS MotionPicture (id int(11), name varchar(255), rating float(11), production varchar(255), budget bigint(20), PRIMARY KEY (id))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS Users (email varchar(255), name varchar(255), age int(11), PRIMARY KEY (email))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS Likes (mpid int(11), uemail varchar(255), PRIMARY KEY (mpid, uemail), FOREIGN KEY (uemail) REFERENCES Users(email), 
        FOREIGN KEY (mpid) REFERENCES MotionPicture(id))`);
        await pool.query(`CREATE TABLE IF NOT EXISTS Movies (mpid int(11) NOT NULL, boxoffice_collection varchar(255), 
        PRIMARY KEY (mpid), FOREIGN KEY (mpid) REFERENCES MotionPicture(id));`);
        await pool.query(`CREATE TABLE IF NOT EXISTS Series (
            mpid int(11) NOT NULL,
            season_count int(11),
            PRIMARY KEY (mpid),
            FOREIGN KEY (mpid) REFERENCES MotionPicture(id));`)
        await pool.query(`CREATE TABLE IF NOT EXISTS People (
            id int(11),
            name varchar(255),
            nationality varchar(255),
            dob varchar(255),
            gender varchar(255),
            PRIMARY KEY (id)
        )`)
        await pool.query(`CREATE TABLE IF NOT EXISTS Role (
            mpid int(11),
            pid int(11),
            role_name varchar(255),
            PRIMARY KEY (mpid, pid, role_name), 
            FOREIGN KEY (mpid) REFERENCES MotionPicture(id),
            FOREIGN KEY (pid) REFERENCES People(id)
        );`)
        await pool.query(`CREATE Table IF NOT EXISTS Award (
            mpid int(11),
            pid int(11),
            award_name varchar(255),
            award_year int(11),
            PRIMARY KEY (mpid, pid, award_name, award_year),
            FOREIGN KEY (mpid) REFERENCES MotionPicture(id),
            FOREIGN KEY (pid) REFERENCES People(id)
        );`)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS Genre (
            mpid int(11),
            genre_name varchar(255),
            PRIMARY KEY(mpid, genre_name),
            FOREIGN KEY (mpid) REFERENCES MotionPicture(id)
        );`)

        await pool.query(`
        CREATE TABLE IF NOT EXISTS Location (
            mpid int(11) NOT NULL,
            zip int(11),
            city varchar(255),
            country varchar(255),
            PRIMARY KEY (mpid, zip),
            FOREIGN KEY (mpid) REFERENCES MotionPicture(id)
            ON DELETE CASCADE
        )`)

        // // Add dummy data

        // // Motion Pictures
        // await pool.query(`INSERT IGNORE INTO MotionPicture (id, name, rating, production, budget) VALUES (?, ?, ?, ?, ?)`, [101, "Breaking Bad", 9.1, "High Bridge Productions", 195000000])
        // await pool.query(`INSERT IGNORE INTO MotionPicture (id, name, rating, production, budget) VALUES (?, ?, ?, ?, ?)`, [102, "Band of Brothers", 9.5, "DreamWorks", 125000000])
        
        
        // // People
        // await pool.query(`INSERT IGNORE INTO People (id, name, nationality, dob, gender) VALUES (?, ?, ?, ?, ?)`, [1, "Bryan Cranston", "USA", "1956-12-12", "M"])
        // await pool.query(`INSERT IGNORE INTO People (id, name, nationality, dob, gender) VALUES (?, ?, ?, ?, ?)`, [2, "Aaron Paul", "USA", "1982-01-12", "M"])


        // // Users
        // await pool.query(`INSERT IGNORE INTO Users (email, name, age) VALUES (?, ?, ?)`, ["test@gmail.com", "User1", 12])
        // await pool.query(`INSERT IGNORE INTO Users (email, name, age) VALUES (?, ?, ?)`, ["test2@gmail.com", "Testing", 50])

        // // Movies
        // await pool.query(`INSERT IGNORE INTO Movies (mpid, boxoffice_collection) VALUES (?, ?)`, [102, "N/A"])

        // // Series 
        // await pool.query(`INSERT IGNORE INTO Series (mpid, season_count) VALUES (?, ?)`, [101, 5])

        // // Role
        // await pool.query(`INSERT IGNORE INTO Role (mpid, pid, role_name) VALUES (?, ?, ?)`, [101, 1, "Actor"])
        // await pool.query(`INSERT IGNORE INTO Role (mpid, pid, role_name) VALUES (?, ?, ?)`, [101, 2, "Actor"])

        // // Likes
        // await pool.query(`INSERT IGNORE INTO Likes (uemail, mpid) VALUES (?, ?)`, ["test@gmail.com", 101])
        // await pool.query(`INSERT IGNORE INTO Likes (uemail, mpid) VALUES (?, ?)`, ["test@gmail.com", 102])
        
        // // Award
        // await pool.query(`INSERT IGNORE INTO Award (mpid, pid, award_name, award_year) VALUES (?, ?, ?, ?)`, [101, 1, "Best Actor", 2014])
        
        // // Genre
        // await pool.query(`INSERT IGNORE INTO Genre (mpid, genre_name) VALUES (?, ?)`, [101, "Drama"])

        // // Location
        // await pool.query(`INSERT IGNORE INTO Location (mpid, zip, city, country) VALUES (?, ?, ?, ?)`, [101, 02215, "Boston", "USA"])

        return true;
    } catch (error) {
        throw error;
    }
}


const fetchMovies = async () => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM MotionPicture`, []);
        if (rows.length === 0) {
            console.log('No movies found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe MotionPicture`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
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
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM People`, []);
        if (rows.length === 0) {
            console.log('No actors found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe People`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]        }
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
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM Location`, []);
        if (rows.length === 0) {
            console.log('No locations found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Location`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
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
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM Role`, []);
        if (rows.length === 0) {
            console.log('No locations found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Role`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
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
        await pool.query(`USE IMDB_PA1`);
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
        await pool.query(`USE IMDB_PA1`);
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
        await pool.query(`USE IMDB_PA1`);
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


const fetchUsers = async () => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM Users`, []);
        if (rows.length === 0) {
            console.log('No users found');
            // If no row data is available then just print out table schema 
            const [rows, fields] = await pool.query(`Describe Users`, []);
            const rowValues = rowParser(rows);
            const columnNames = extractColumns(rowValues);
            return [rowValues, columnNames]
        }
        else {
            const users = rowParser(rows);
            const columnNames = extractColumns(users);
            return [users, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const fetchLikes = async () => {
    try {
        await pool.query(`USE IMDB_PA1`);
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
        await pool.query(`USE IMDB_PA1`);
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

const likeMovie = async (uemail, mpid) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        await pool.query(`INSERT IGNORE INTO Likes (uemail, mpid) VALUES (?, ?)`, [uemail, mpid]);
        return true;
    } catch (error) {
        console.log(error.message)
        throw new Error(error.message)
    }   
}

const findMPByName = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT m.name, m.rating, m.production, m.budget FROM MotionPicture m WHERE m.name like ?`, [query + "%"]);
        if (rows.length === 0) {
            console.log('No motion pictures found');
            return [[], []]
        }
        else {
            const mps = rowParser(rows);
            const columnNames = extractColumns(mps);
            return [mps, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const findLikesByEmail = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT m.name, m.rating, m.production, m.budget FROM MotionPicture m WHERE m.id in (SELECT l.mpid FROM Likes l WHERE l.uemail = ?)`, [query]);
        if (rows.length === 0) {
            console.log('No motion pictures found');
            return [[], []]
        }
        else {
            const mps = rowParser(rows);
            const columnNames = extractColumns(mps);
            return [mps, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

const findMPByLocation = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT * FROM MotionPicture m WHERE m.id in (SELECT l.mpid FROM Location l WHERE l.country = ?)`, [query]);
        if (rows.length === 0) {
            console.log('No motion pictures found');
            return [[], []]
        }
        else {
            const mps = rowParser(rows);
            const columnNames = extractColumns(mps);
            return [mps, columnNames]
        }
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


const findDirectorByZipcode = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT p.name as director, mp.name FROM Location l, Role r, MotionPicture mp, Series s, People p WHERE r.mpid = l.mpid AND l.mpid = s.mpid AND mp.id = s.mpid AND p.id = r.pid AND l.zip = ?`, [query]);
        if (rows.length === 0) {
            console.log('No directors found');
            return [[], []]
        }
        else {
            console.log(rows)
            const directors = rowParser(rows);
            const columnNames = extractColumns(directors);
            return [directors, columnNames]
        }  
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const findPeopleReceivedKAwards = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT p.name as director, mp.name FROM Location l, Role r, MotionPicture mp, Series s, People p WHERE r.mpid = l.mpid AND l.mpid = s.mpid AND mp.id = s.mpid AND p.id = r.pid AND l.zip = ?`, [query]);
        if (rows.length === 0) {
            console.log('No directors found');
            return [[], []]
        }
        else {
            console.log(rows)
            const directors = rowParser(rows);
            const columnNames = extractColumns(directors);
            return [directors, columnNames]
        }  
    } catch (error) {
        console.log(error);
        throw error;
    }
}


const findSameBirthDayActors = async (query) => {
    try {
        await pool.query(`USE IMDB_PA1`);
        const [rows, fields] = await pool.query(`SELECT p1.name as Actor1, p2.name as Actor2, p1.dob as DOB FROM People p1, People p2, Role r WHERE p1.id != p2.id AND p1.dob = p2.dob AND p1.id = r.pid`, [query]);
        if (rows.length === 0) {
            console.log('No directors found');
            return [[], []]
        }
        else {
            console.log(rows)
            const directors = rowParser(rows);
            const columnNames = extractColumns(directors);
            return [directors, columnNames]
        }  
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const signupUser = async (email, name, age) => {
    try {
        // fetch user and see if exists
        const user = await fetchUser(email);
        if (!user) {
            await pool.query(`USE IMDB_PA1`);
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
    fetchUsers: fetchUsers,
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
    likeMovie: likeMovie,
    findMPByName: findMPByName,
    findLikesByEmail: findLikesByEmail,
    findMPByLocation: findMPByLocation,
    findDirectorByZipcode: findDirectorByZipcode,
    findPeopleReceivedKAwards: findPeopleReceivedKAwards,
    findSameBirthDayActors: findSameBirthDayActors,
    initializeDB: initializeDB
}