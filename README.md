<!-- DOCUMENTATION -->
## IMDB Movie Site: Project 1


Contributors: Gagandeep Kang and Moonis Thadey

## Getting Started and Installation

For this application, we elected to use a client-server architecture. 

Our front-end uses [React.js](https://reactjs.org/) <br />
Our server (back-end) uses [Node.js and Express](https://expressjs.com/) <br />
Backend is connected to a MySQL database which is running through XAMPP 

```
├── client/
│   ├── src
│       ├── components/
│       └── utils/ 
├── server/
│   ├── services
│   ├── utils/
│   └── index.js/ 
├── package.json
└── ...
```
1. Install Node.js if you have not already installed it. Download [here](https://nodejs.org/en/download/)

Verify that you properly installed node by opening a terminal and running
```
node --version
```
You should see a version number like this: 

```
v16.9.1
```

2. Navigate to the root directory of the project. And open up two terminal instances. If running on VSCode, you can use the split terminal option

In first terminal, navigate into the `client` directory 
```
cd client
```

If you are in the right directory when you type the following command you should see: 

```
ls

Correct Output: 

README.md               package.json            yarn.lock
node_modules            public
package-lock.json       src
```

3. Install relevant dependencies using npm

```
npm install 
```


4. If no errors are thrown in installation then you can run client

```
npm run start 
```

NOW YOU MUST ALSO START SERVER AS WELL SO CONTINUE READING

5. Now in your second terminal instance, change directories into the server 

Note: Make sure that your client is still running

```
cd server
```

6. Install relevant server dependencies 

```
npm install
```

7. Run Server 

```
npm run start
```
If successful, you should see the following in your terminal instance

```
> server@1.0.0 start
> nodemon ./index.js

[nodemon] 2.0.13
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node ./index.js`
Listening on port 8080

```

## Database Configuration 

We are using MySQL for our project database. Ensure that you have MySQL running. 

Currently, MySQL is running and expected to be on `localhost`. You don't need to initialize a project database but if you do, please name it 
`IMDB_PA1`. However our `initialize-db/` route will create the tables and populate them with dummy data

See the configuration below for how to set up your SQL server. 
The following is from the `QueryService.js` file in the `utils/` directory

```
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
```


<!-- CONTACT -->
## Contact

Gagandeep Kang – gskang@bu.edu <br />
Moonis Thadey