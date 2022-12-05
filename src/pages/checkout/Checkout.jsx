import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import './checkout.css';
import { Card, Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { data } from 'autoprefixer';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CartItem from '../../components/cartitem/CartItem';


function Checkout() {

    const [address, setAddress] = useState("");


    const handleAddress = (event) => {
        setAddress(event.target.value);
    }

    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem/";
    const walletEndpoint = "http://localhost:8080/oops/api/wallet/";
    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const userEndPoint = "http://localhost:8080/oops/api/user/";


    const [products, setProducts] = useState([])
    const [wallet, setWallet] = useState(0)
    const [itemQuantities, setitemQuantities] = useState([])
    const [total, setTotal] = useState(0);
    const [isEnough, setIsEnough] = useState(true);
    const [cart, setCart] = useState([]);
    const [checkedout, setCheckedOut] = useState(false);

    const getCartItems = async () => {
        var cartItemEndpointuid = cartItemEndpoint + localStorage.getItem('uid');
        const response = await fetch(cartItemEndpointuid);
        const myJson = await response.json();
        setCart(myJson);

        var produ = []
        var quantities = []
        var subtotal = 0;

        myJson.forEach(async (element) => {
            const response2 = await fetch(prodEndPoint + "/pid=" + element.pid);
            const myJson2 = await response2.json();
            subtotal += (myJson2.price * element.quantity);
            produ.push(myJson2);
            quantities.push(element.quantity);
            setProducts(produ);
            setitemQuantities(quantities);
            setTotal(subtotal);
            console.log(total);
        });

    }

    const updateWallet = (event) => {
        var data = JSON.stringify({
            "uid": localStorage.getItem('uid'),
            "amount": parseInt(wallet.amount) - parseInt(total)
        });

        var config = {
            method: 'post',
            url: 'http://localhost:8080/oops/api/wallet/update',
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

    }


    const getWallet = async () => {
        var walletEndpointuid = walletEndpoint + localStorage.getItem('uid');
        const response = await fetch(walletEndpointuid);
        const myJson = await response.json();
        setWallet(myJson);
    }

    const getAddress = async () => {
        var userEndPointuid = userEndPoint + localStorage.getItem('uid');
        const response = await fetch(userEndPointuid);
        const myJson = await response.json();
        console.log(myJson);
        setAddress(myJson.address);
    }

    const handleDelete = (pid) => {

        var itemId = cart.filter(function (item) {
            return item.pid == pid;
        })
        console.log(itemId[0].id);

        var data = JSON.stringify({
            "id": itemId[0].id
        });

        var config = {
            method: 'delete',
            url: 'http://localhost:8080/oops/api/cartItem/delete',
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
    }


    const checkIfEnough = () => {
        if (wallet.amount >= total) {
            console.log("yoo");
            setIsEnough(true);
        }
        else {
            console.log("nooo");
            console.log(wallet, total);
            setIsEnough(false);
        }
    }


    useEffect(() => {
        getCartItems();
        getWallet();
        getAddress();
    }, [])





    const navigate = useNavigate();

    const handlePressed = (event) => {
        checkIfEnough();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        if (isEnough) {
            console.log(products);
            if (wallet.amount > total) {
                var dataAll = "[";
                products.forEach((item, index) => {
                    var data = JSON.stringify(
                        {
                            "uid": localStorage.getItem('uid'),
                            "pid": item.id,
                            "quantity": itemQuantities[index],
                            "orderDate": today,
                            "address": address
                        }
                    );
                    if (index == products.length - 1) {
                        dataAll = dataAll + data + "]";
                    }
                    else {
                        dataAll = dataAll + data + ",";
                    }
                });
                console.log(dataAll)
                var config = {
                    method: 'post',
                    url: 'http://localhost:8080/oops/api/order',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: dataAll
                };
                axios(config)
                    .then(function (response) {
                        console.log(JSON.stringify(response.data));
                        checkIfEnough();
                        if (isEnough) {
                            if (wallet.amount > total) {
                                products.forEach((item) => {
                                    console.log(item.id);
                                    handleDelete(item.id);
                                });
                                updateWallet();
                            }
                            else {
                                setIsEnough(false);
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                setCheckedOut(true);
                setTimeout(() => { navigate('/') }, 5000)
            }
            else {
                setIsEnough(false);
            }
        }

    }

    return checkedout ? (<h1>Thank you for placing your order</h1>) : (<div className="checkout">
        <Grid container columnSpacing={10}>
            <Grid item xs={8}>
                <Stack spacing={5} className="stack">

                    <TextField
                        label="Address"
                        defaultValue={address}
                        variant="outlined"
                        sx={{ width: 300, alignSelf: 'center' }}
                        value={address}
                        onChange={handleAddress}
                    />
                    <hr></hr>
                    <h3>Your Items</h3>

                    {products.map((product, index) => {
                        return (<Stack divider={<></>}>  <CartItem
                            key={index}
                            image={product.image}
                            description={product.description}
                            price={product.price}
                            name={product.name}
                            quantity={itemQuantities[index]}
                            isDeletable={false}
                            handledelete={() => {


                                handleDelete(product.id);
                                console.log(product.id);

                            }}


                        /></Stack>)
                    })}
                </Stack>
                {isEnough ? <h2></h2> : <h2>Funds not Sufficient, click to add money to your wallet</h2>}
            </Grid>

            <Grid item xs={4}>
                <Card sx={{ alignItems: "center" }}>
                    <Stack>
                        <p>Subtotal: ₹{total}</p>
                        <Stack direction="row" spacing={4}><p>Wallet Balance: ₹{wallet.amount}</p><AddCircleIcon /></Stack>
                        <Button
                            variant="contained"
                            sx={{
                                width: 100,
                                alignSelf: 'center'

                            }}
                            onClick={handlePressed}

                        >
                            Place order
                        </Button>

                    </Stack>
                </Card>
            </Grid>
        </Grid>
    </div>);

}




export default Checkout;