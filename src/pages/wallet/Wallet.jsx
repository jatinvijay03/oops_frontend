import {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import './wallet.css';
import { Card } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';


function Wallet() {

    const [address,setAddress] = useState("");


    const handleAmount = (event)=>{
        setAmount(event.target.value);
    }

    const walletEndpoint = "http://localhost:8080/oops/api/wallet/";


  
    const [wallet, setWallet] = useState(0)
    const [password,setPassword] = useState("");
    const [amount, setAmount] = useState(0)
    const [isError, setError] = useState(false)
    
    const getWallet = async () => {
        var walletEndpointuid = walletEndpoint + localStorage.getItem('uid');
        const response = await fetch(walletEndpointuid);
        const myJson = await response.json();
        setWallet(myJson);
    }


    useEffect(() => {
        getWallet();
    }, [])

    const navigate = useNavigate();

    const handlePassword = (event)=>{
        setPassword(event.target.value);
    }

    const handlePressed =  (event)=>{
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
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload();
          })
          .catch(function (error) {
            setError(true);
            console.log(error);
          });
          
    }

    return(
        <div className="Login">
            <Card
                variant="outlined"
                className="Card"
                sx={{ width: 400, alignSelf: 'center', }}
            >
                <Stack spacing={5} className="stack">
                    <h1>Add Money</h1>
                    <TextField
                        label="Amount"
                        defaultValue={0}
                        variant="outlined"
                        sx={{ width: 300 ,alignSelf: 'center'}}
                        value={amount}
                        onChange = {handleAmount}
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
                        Add money
                    </Button>
                    <h2>{wallet.amount}</h2>
                </Stack>
                {isError? <h2>Couldn't add the money</h2> : <h2></h2>}
            </Card>
        </div>

    );


}

export default Wallet;