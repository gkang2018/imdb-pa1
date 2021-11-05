import React, {useState} from 'react'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import {setToken} from '../utils/useLocalStorage'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const Signup = ({handleShowSnackbar, handleLogin}) => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
        name: "",
        age: ""
    })
    const history = useHistory();

    const setOneState = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleSubmit = async () => {
        const submitData = {"email": state.email, "name": state.name, "age": state.age}
        try {
            const raw = await fetch("/signup", {
                method: "POST", 
                body: new URLSearchParams(submitData),         
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
             }});
            const response = await raw.json();
            if (raw.status === 200) {
                const token = response.token;
                handleLogin(true);
                setToken(token);
                history.push("/home")
            }
            else {
                // Unable to signup
                console.log("Could not signup");
                handleShowSnackbar(true, "Unable to signup. Please try again with valid credentials")
            }
        } catch (error) {
            console.log(error);
            handleShowSnackbar(true, "Unable to signup")
        }
    }   

    return (
        <form className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField
                id="standard-multiline-flexible"
                label="Email"
                defaultValue={state.email}
                onChange={(e) => setOneState("email", e.target.value)}
            />
            <TextField
                id="standard-multiline-flexible"
                label="Name"
                defaultValue={state.name}
                onChange={(e) => setOneState("name", e.target.value)}
            />
            <TextField
                id="standard-multiline-flexible"
                label="Age"
                defaultValue={state.age}
                onChange={(e) => setOneState("age", e.target.value)}
            />
        </div>
        <Button variant="contained" onClick = {handleSubmit}>Submit</Button>
        </form>
    )
}

export default Signup

