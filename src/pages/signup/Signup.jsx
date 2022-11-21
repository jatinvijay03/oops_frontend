
import {useState} from 'react';


import Button from "@mui/material/Button";
import './signup.css';
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';


function Signup() {

    var XMLHttpRequest = require('xhr2')

    const [fname,setfName] = useState("");
    const [lname,setlName] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setconfirmPassword] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [username,setUsername] = useState("");

    const [isSignup,setSignup] = useState(false);

    

    const handlefName = (event)=>{
        setfName(event.target.value);
        
    }

    const handlelName = (event)=>{
        setlName(event.target.value);
        
        
    }

    const handleEmail = (event)=>{
        setEmail(event.target.value);
        
        
    }

    const handlePhone = (event)=>{
        setPhone(event.target.value);
        
        
    }

    const handleUsername = (event)=>{
        setUsername(event.target.value);
        
        
    }

    const handlePassword = (event)=>{
        setPassword(event.target.value);
        
        
    }

    const handlePressed =  (event)=>{
        var data = JSON.stringify({
            "email": email,
            "name": fname,
            "password": password,
            "phone": phone,
            "username": username
          });

        
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:8080/api/v1/user", true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data);


        if (xhttp.status === 200)
            setSignup(true);
        
    }

    return isSignup?(<h1>Youre signuped</h1>):(
        <div className="Signup">
            <Card
                variant="outlined"
                className="Card"
                sx={{ width: 600, alignSelf: 'center', }}

            >
                <Grid
                    container rowSpacing={5} columnSpacing={0}
                >
                    <Grid item xs={12}>
                        <h1>Sign Up</h1>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 200 }}
                            label="First Name"
                            value = {fname}
                            onChange = {handlefName}
                             />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 200 }}
                            label="Last Name"
                            value = {lname}
                            onChange = {handlelName} />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 300 }}
                            label="Email"
                            value = {email}
                            onChange = {handleEmail} />
                    </Grid>
                    <Grid item xs={4}  >
                        <Box display="flex" justifyContent="flex-start">
                            <TextField
                                variant="outlined"
                                sx={{ width: 150 }}
                                label="Phone No."
                                value = {phone}
                                onChange = {handlePhone}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 300 }}
                            label="Username"
                            value = {username}
                            onChange = {handleUsername} />
                    </Grid>
                    <Grid item xs={4} />
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 200 }}
                            label="Password"
                            type="password"
                            value = {password}
                            onChange = {handlePassword}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            sx={{ width: 200 }}
                            label="Confirm Password"
                            type="password"
                             />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{
                                width: 100,
                                alignSelf: 'center'

                            }}
                            onClick = {handlePressed}

                        >
                            Sign Up
                        </Button>
                    </Grid>


                </Grid>
            </Card>
        </div>

    );


}

export default Signup;