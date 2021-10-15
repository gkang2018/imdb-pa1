import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

// Screen Imports 
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import Landing from './components/Landing';

import { getToken, deleteToken } from './utils/useLocalStorage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const history = useHistory();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarConfig, setSnackbarConfig] = useState({
    vertical: 'top',
    horizontal: 'center',
  })


  const handleClose = () => {
    setShowSnackbar(false);
    setSnackbarMessage("");
  }


  const handleShowSnackbar = (show, message) => {
    setShowSnackbar(show);
    setSnackbarMessage(message)
  }


  const checkAuthStatus = () => {
    const token = getToken(); 
    token !== ""? setLoggedIn(true) : setLoggedIn(false);
    if (isLoggedIn) {
      history.push("/home")
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
    deleteToken();
    history.push("/");
  }


  const initializeDB = async () => {
    try {
        const response = await fetch("/initialize-db", {
            method: "GET",
        });
        if (!response.ok) {
          handleShowSnackbar(true, "Unable to initialize DB")
        }
    } catch (error) {
        console.log(error)
        handleShowSnackbar(true, "Unable to initialize db")
    }
}



  // Fire only when app first loads, to initialize and populate DB
  useEffect(() => {
    initializeDB();
  }, [])

  useEffect(() => {
    checkAuthStatus();
  })


  const {vertical, horizontal} = snackbarConfig;

  return (
    <div>
    <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          <Button color="inherit" onClick={() => history.push("/")}>IMDB Movie Site</Button>
        </Typography>
        {isLoggedIn ? 
        <div>
          <Button color="inherit" onClick={() => history.push("/home")}>View Tables</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div> :  
        <div>
          <Button color="inherit" onClick={() => history.push("/login")}>Login</Button>
        <Button color="inherit" onClick={() => history.push("/signup")}>Signup</Button> 
        </div> 
        }
      </Toolbar>
    </AppBar>
  </div>
  <Snackbar
        anchorOrigin={{vertical, horizontal}}
        key={`${vertical},${horizontal}`}
        open={showSnackbar}
        onClose={handleClose}
        message={snackbarMessage}> 
  </Snackbar>
  <div>
    <Switch>
          <Route path="/login">
            <Login handleShowSnackbar = {handleShowSnackbar} />
          </Route>
          <Route path="/signup">
            <Signup handleShowSnackbar = {handleShowSnackbar} />
          </Route>
          <Route path="/home">
            <Home handleShowSnackbar = {handleShowSnackbar} />
          </Route> 
          <Route path="/">
            <Landing handleShowSnackbar = {handleShowSnackbar} />
          </Route>
      </Switch>
  </div>
</div>
  )
}

export default App;
