import {useState} from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import './login.css';
import { Card } from "@mui/material";
import TextField from '@mui/material/TextField';


function Login() {

    var XMLHttpRequest = require('xhr2')
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [isLogin,setLogin] = useState(false)

    const handleUsername = (event)=>{
        setUsername(event.target.value);
        
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);


    }


    const handlePressed =  (event)=>{
        
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "http://localhost:8080/api/v1/user", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();
        console.log(xhttp.status);


        if (xhttp.status == 200)
            setLogin(true);
        
    }

    return isLogin?(<h1>You Are Logged In</h1>):(
        <div className="Login">
            <Card
                variant="outlined"
                className="Card"
                sx={{ width: 400, alignSelf: 'center', }}
            >
                <Stack spacing={5} className="stack">
                    <h1>Login</h1>
                    <TextField

                        label="Username"
                        variant="outlined"
                        sx={{ width: 300 ,alignSelf: 'center'}}
                        value={username}
                        onChange = {handleUsername}
                    />

                    <TextField
                        label="Passssword"
                        variant="outlined"
                        sx={{ width: 300 ,alignSelf: 'center'}}
                        value={password}
                        onChange = {handlePassword}
                    />

                    <Button
                        variant="contained"
                        sx={{
                            width: 100,
                            alignSelf: 'center'

                        }}
                        onClick = {handlePressed}

                    >
                        Login
                    </Button>

                </Stack>
            </Card>
        </div>

    );


}

export default Login;