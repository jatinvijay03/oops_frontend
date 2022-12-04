import {useState} from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import './login.css';
import { Card } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Login() {

    const [password,setPassword] = useState("");
    const [email,setEmail] = useState("");
    const [isLogin,setLogin] = useState(false);
    const [errorn , seterrorn] = useState(false);

    const handleEmail = (event)=>{
        setEmail(event.target.value);
        
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);


    }


    const navigate = useNavigate();

    const handlePressed =  (event)=>{

        var data = JSON.stringify({
            "email": email,
            "password": password
        });
        
        var config = {
            method: 'post',
            url: 'http://localhost:8080/oops/api/user/login',
            headers: { 
            'Content-type': 'application/json'
            },
            data : data
        };
        
        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.id){
                setLogin(true);
                localStorage.setItem('uid', response.data.id);
                navigate('/')
            }
        })
        .catch(function (error) {
            console.log(error);
            seterrorn(true);
        });

        
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

                        label="Email id"
                        variant="outlined"
                        sx={{ width: 300 ,alignSelf: 'center'}}
                        value={email}
                        onChange = {handleEmail}
                    />

                    <TextField
                        label="Password"
                        variant="outlined"
                        sx={{ width: 300 ,alignSelf: 'center'}}
                        type = "password"
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
                {errorn?(<h2>Try again</h2>) : (<h2></h2>)}
            </Card>
        </div>

    );


}

export default Login;