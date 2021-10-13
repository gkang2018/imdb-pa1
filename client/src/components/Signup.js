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

const Signup = () => {
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

