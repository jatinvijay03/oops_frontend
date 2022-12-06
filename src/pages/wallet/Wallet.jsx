import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import './wallet.css';
import { Card } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/appbar/SearchBar'
import { Alert } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';



function Wallet() {

    const [address, setAddress] = useState("");
    const [searchInput, setSearch] = useState("");


    const handleAmount = (event) => {
        setAmount(event.target.value);
    }

    const walletEndpoint = "http://localhost:8080/oops/api/wallet/";
    const prodEndPoint = "http://localhost:8080/oops/api/product";



    const [wallet, setWallet] = useState(0)
    const [password, setPassword] = useState("");
    const [amount, setAmount] = useState(0)
    const [isError, setError] = useState(false)
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false);

    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

    const getWallet = async () => {
        var walletEndpointuid = walletEndpoint + localStorage.getItem('uid');
        const response = await fetch(walletEndpointuid);
        const myJson = await response.json();
        setWallet(myJson);
    }


    useEffect(() => {
        getWallet();
    }, [])

    const handleSearchInput = (event) => {
        setSearch(event.target.value);

    }

    const handleSearchButtonClick = (event) => {
        setSearchValue(searchInput)

        navigate('/products/' + (searchInput));
    }

    const getCategs = async () => {

        if (searchvalue.includes("category=")) {
            var a = searchvalue.indexOf("=");
            const response = await fetch(prodEndPoint + "/category=" + searchvalue.substring(a + 1));
            const myJson = await response.json();
            setProducts(myJson)
        }
        else {
            const response = await fetch(prodEndPoint + "/q=" + searchvalue);
            const myJson = await response.json();
            // const response2 = await fetch(categEndPoint);
            // const myJson2 = await response2.json(); //extract JSON from the http response
            setProducts(myJson)
        }
    }
    useEffect(() => {
        getCategs();

    }, [searchvalue]);

    const navigate = useNavigate();

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handlePressed = (event) => {
        var data = JSON.stringify({
            "uid": localStorage.getItem('uid'),
            "amount": parseInt(wallet.amount) + parseInt(amount),
            "pin": password
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8080/oops/api/wallet/topup',
            headers: {
                'Content-type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch(function (error) {
                setError(true);
                setTimeout(() => setError(false), 2000)
                
            }).then(function(){
                if (!isError) {
                    setShow(true);
                    setTimeout(() => setShow(false), 2000)
                }
            })
           
            
        

    }

    return (
        <div className='wallet'>  <SearchBar
            searchvalue={searchInput}
            searchfunction={handleSearchInput}
            searchbuttonfunction={handleSearchButtonClick}
        />
            <Card className='Card'>
                <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
                                Add Money To Your Wallet
                            </h2>
                            <h5 className='currentclass text-left'>Current Balance: ₹{wallet.amount}</h5>

                        </div>
                        <form className="mt-8 space-y-6" action="#" method="POST">
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="-space-y-px rounded-md shadow-sm">
                                <div>
                                    <label htmlFor="amount" className="sr-only">
                                        Amount
                                    </label>
                                    <input
                                        id="amount"
                                        name="amount"
                                        type="amount"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Amount"
                                        value={amount}
                                        onChange={handleAmount}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Enter Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={handlePassword}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">

                                </div>
                            </div>

                            <div>
                                <Button
                                    onClick={handlePressed}
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >

                                    Add Money
                                </Button>

                                {isError ? (<Alert className="alert error" variant="danger" onClose={() => setError(false)}>
                                    <p><CancelIcon />&nbsp;&nbsp;Could not add money to wallet</p>
                                </Alert>) : (<></>)}
                            </div>
                        </form>
                    </div>
                </div>
            </Card>
            {show ? (<Alert className="alert" variant="success" onClose={() => setShow(false)}>
                <p><CheckCircleIcon />&nbsp;&nbsp;Money added to wallet!</p>
            </Alert>) : (<></>)}
        </div>
    )
}


export default Wallet;