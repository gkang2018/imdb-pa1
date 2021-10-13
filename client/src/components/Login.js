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

const Login = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: "",
    })
    const history = useHistory();

    const setOneState = (key, value) => {
        setState((prevState) => ({
            ...prevState,
            [key]: value
        }))
    }

    const handleSubmit = async () => {
        const submitData = {"email": state.email}
        try {
            const raw = await fetch("/login", {
                method: "POST", 
                body: new URLSearchParams(submitData),         
                headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
             }});
            const response = await raw.json();
            const token = response.token;
            setToken(token);
            history.push("/home")
        } catch (error) {
            console.log(error);
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
        </div>
        <Button variant="contained" onClick = {handleSubmit}>Submit</Button>
        </form>
    )
}

export default Login

