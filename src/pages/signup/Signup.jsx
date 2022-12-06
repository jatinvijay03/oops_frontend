
import { useState } from 'react';


import Button from "@mui/material/Button";
import './signup.css';
import { Card } from "@mui/material";
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




    const handlefName = (event) => {
        setfName(event.target.value);

    }

    const handleEmail = (event) => {
        setEmail(event.target.value);


    }

    const handlePhone = (event) => {
        setPhone(event.target.value);


    }

    const handleAddress = (event) => {
        setAddress(event.target.value);


    }

    const handlePassword = (event) => {
        setPassword(event.target.value);


    }
    const handleConfirm = (event)=>{
        setconfirmPassword(event.target.vale)
    }

    const navigate = useNavigate();

    

    const handlePressed = (event) => {



        var data = JSON.stringify({
            "email": email,
            "password": password,
            "address": address,
            
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
                                "msgBody": "Welcome to Aggarwal's Online Super Market! We hope you enjoy shopping with us!",
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
            });}





        return (
            <>
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt="Your Company"
                            />
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
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Name"
                                        value={fname}
                                        onChange={handlefName}
                                    />
                                </div>
                                <div>
                                    
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autocomplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={handleEmail}
                                    />
                                </div>
                                <div>
                                    
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autocomplete="off"
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
                                        autocomplete="off"
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
                                        autocomplete="off"

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
                                        autocomplete="off"
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
                                        {errorn ? (<h2>Couldn't sign you up</h2>) : (<h2></h2>)}
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

                                    Sign in
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
