
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import './login.css';
import { Card } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';


// function Login() {

//     const [password,setPassword] = useState("");
//     const [email,setEmail] = useState("");
//     const [isLogin,setLogin] = useState(false);
//     const [errorn , seterrorn] = useState(false);

//     const handleEmail = (event)=>{
//         setEmail(event.target.value);


//     }

//     const handlePassword = (event)=>{
//         setPassword(event.target.value);


//     }


//     const navigate = useNavigat

//     return isLogin?(<h1>You Are Logged In</h1>):(
//         <div className="Login">
//             <Card
//                 variant="outlined"
//                 className="Card"
//                 sx={{ width: 400, alignSelf: 'center', }}
//             >
//                 <Stack spacing={5} className="stack">
//                     <h1>Login</h1>
//                     <TextField

//                         label="Email id"
//                         variant="outlined"
//                         sx={{ width: 300 ,alignSelf: 'center'}}
//                         value={email}
//                         onChange = {handleEmail}
//                     />

//                     <TextField
//                         label="Password"
//                         variant="outlined"
//                         sx={{ width: 300 ,alignSelf: 'center'}}
//                         type = "password"
//                         value={password}
//                         onChange = {handlePassword}
//                     />

//                     <Button
//                         variant="contained"
//                         sx={{
//                             width: 100,
//                             alignSelf: 'center'

//                         }}
//                         onClick = {handlePressed}

//                     >
//                         Login
//                     </Button>

//                 </Stack>
//                 
//             </Card>
//         </div>

//     );


// }



import { useState } from 'react';
import { Grid } from "@mui/material";


export default function Login() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setLogin] = useState(false);
    const [errorn, seterrorn] = useState(false);

    const handleEmail = (event) => {
        setEmail(event.target.value);


    }

    const handlePassword = (event) => {
        setPassword(event.target.value);


    }


    const navigate = useNavigate();

    const handlePressed = (event) => {

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
            data: data
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            if(response.data.id){
                setLogin(true);
                localStorage.setItem('uid', response.data.id);
                localStorage.setItem('email', response.data.email);
                navigate('/')
            }
        })
        .catch(function (error) {
            console.log(error);
            seterrorn(true);
        });


    }

    return (
        <div className="loginpage">
        <Card bg="light" className="login">
            <Grid container>
                <Grid item xs={6}>
                    <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3087&q=80" />
                </Grid>
                <Grid item xs={6}>
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>

                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="email-address" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    {errorn?(<p>Try again</p>) : (<h2></h2>)}
                                    </label>
                                </div>

                                <div className="text-sm ">
                                    <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 fgpw">
                                        Don't have an account? Sign up!
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button

                                    onClick={handlePressed}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div></Grid>
            </Grid>
        </Card>
        </div>
    )
}
