
import { useState } from 'react';


import Button from "@mui/material/Button";
import './signup.css';
import { Card } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import { useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';



export default function Signup() {


    const [fname, setfName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setconfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorn, seterrorn] = useState(false);
    const [errorm, seterrorm] = useState("Couldn't sign you up")




    const handlefName = (event) => {
        setfName(event.target.value);
        if(fname.length < 2){
            seterrorn(true);
            seterrorm("Name must be longer");
        }
        else{
            seterrorn(false);
            seterrorm("Couldn't sign you up")
        }
    }

    const validateEmail = (email) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email);
      };

    const handleEmail = (event) => {
        setEmail(event.target.value);
        if(!validateEmail(email)){
            seterrorn(true);
            seterrorm("Invalid Email id")
        }
        else{
            seterrorn(false);
            seterrorm("Couldn't sign you up")
        }

    }

    const handlePhone = (event) => {
        setPhone(event.target.value);


    }

    const handleAddress = (event) => {
        setAddress(event.target.value);


    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
        if(password.length < 5){
            seterrorn(true);
            seterrorm("Password must be longer");
        }
        else{
            seterrorn(false);
            seterrorm("Couldn't sign you up")
        }

    }
    const handleConfirm = (event)=>{
        setconfirmPassword(event.target.value);
    }

    const navigate = useNavigate();

    

    const handlePressed = (event) => {
        if(fname.length < 2){
            seterrorn(true);
            seterrorm("Name must be longer");
        }
        else if(!validateEmail(email)){
            seterrorn(true);
            seterrorm("Invalid Email id")
        }

        else if(password.length < 5){
            seterrorn(true);
            seterrorm("Password must be longer");
        }

        else if(confirmpassword != password){
            seterrorn(true);
            seterrorm("Passwords don't match");
        }
        
        else{ 
                var data = JSON.stringify({
                    "email": email,
                    "password": password,
                    "address": address,
                    "role": "customer",
                    "name": fname,
                    "number": phone
                });
        
                var config = {
                    method: 'post',
                    url: 'http://localhost:8080/oops/api/user',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: data
                };
        
                axios(config)
                    .then(function (response) {
                        if (response.status == 200) {
                            console.log(response.data);
                            localStorage.setItem('uid', response.data.id);
                            localStorage.setItem('email', response.data.email);
                            var data1 = JSON.stringify({
                                "uid": response.data.id,
                                "amount": 1000,
                                "pin": response.data.password
                            });
        
                            var config1 = {
                                method: 'post',
                                url: 'http://localhost:8080/oops/api/wallet',
                                headers: {
                                    'Content-type': 'application/json'
                                },
                                data: data1
                            };
        
                            axios(config1)
                                .then(function (response) {
                                    var data = JSON.stringify({
                                        "recipient": localStorage.getItem('email'),
                                        "msgBody": "Hi "+ fname +", Welcome to Aggarwal's Online Super Market! We hope you enjoy shopping with us!",
                                        "subject": "Aggarwal's Online Super Market Account Created"
                                    });
        
                                    var config = {
                                        method: 'post',
                                        url: 'http://localhost:8080/oops/api/sendEmail',
                                        headers: {
                                            'Content-type': 'application/json'
                                        },
                                        data: data
                                    };
        
                                    axios(config)
                                        .then(function (response) {
                                            console.log(JSON.stringify(response.data));
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    navigate('/')
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
        
                        }
                        console.log(JSON.stringify(response.data));
                    })
                    .catch(function (error) {
                        console.log(error);
                        seterrorn(true);
                        seterrorm("Couldn't sign you up");
                    });
        }
        }





        return (
            <div className="SignUpPage">
            <Card bg="light" className="login">
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            {/* <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            /> */}
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Create Your Account
                            </h2>

                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <input
                                        id="name"
                                        name="Name"
                                        type="Name"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Name"
                                        value={fname}
                                        onChange={handlefName}
                                    />
                                </div>
                                <input id= "non2" name= "non2" type="email" className= "relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm inputnon"/>
                                <div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                    
                                </div>
                                <div>
                                <input id= "non" name= "non" type="password" className= "relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm inputnon"/>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </div>
                                <div>
                                   
                                    <input
                                        id="confirm"
                                        name="confirm"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Confirm Password"
                                        value={confirmpassword}
                                        onChange={handleConfirm}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="address"
                                        name="address"
                                        type="address"
                                        autoComplete="off"

                                        className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Address"
                                        value={address}
                                        onChange ={handleAddress}
                                    />
                                </div>
                                <div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="phone"
                                        maxLength="10"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Phone No."
                                        value={phone}
                                        onChange ={handlePhone}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        {errorn ? (<h2 className="error-text">{errorm}</h2>) : (<h2></h2>)}
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500 fgpw">
                                        Already have an account? Login
                                    </a>
                                </div>
                            </div>

                            <div>
                                <Button
                                    
                                    onClick={handlePressed}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >

                                    Sign Up
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
            </div>
        )
    }
