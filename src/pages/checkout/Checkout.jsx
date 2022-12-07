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
import BrandBar from '../../components/appbar/BrandBar';
import { Alert } from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/CheckCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


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
    const [errorm, seterrorm] = useState("Cannot buy more than in stock!")
    const [cart, setCart] = useState([]);
    const [checkedout, setCheckedOut] = useState(false);
    const [na, setna] = useState("");

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

    const handleStockChange = (pid, stock) => {
        var data1 = JSON.stringify({
            "id": pid,
            "stock": stock,
            "name":na
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8080/oops/api/product/updatestock',
            headers: { 
              'Content-type': 'application/json'
            },
            data : data1
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
        var st = false;
        products.forEach((prod, index) => {
            console.log(prod.stock, itemQuantities[index])
            if(parseInt(prod.stock) < parseInt(itemQuantities[index])){
                st = true;
            }
        })
        if(st){
            console.log("alkjsfd");
            seterrorm('Cannot buy more than in stock!');
            setna("no");
            setIsEnough(false);
        }
        else{
            console.log("hihi");
            if (wallet.amount >= total) {
                setIsEnough(true);
            }
            else {
                seterrorm('Not enough money in wallet');
                setIsEnough(false);
            }
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
        if(isEnough) {
            console.log(products);
            if (wallet.amount > total) {
                var mBody = "Thanks for shopping with Aggarwal's Online Supermarket, \nYour order details are as follows, \nDelivery Address: "
                mBody = mBody + address + "\n"
                var dataAll = "[";
                var placeOrder = true;
                products.forEach((item, index) => {
                    if(item.stock < itemQuantities[index]){
                        seterrorm('Cannot buy more than in stock!');
                        setIsEnough(false);
                        placeOrder = false;
                    }
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
                        mBody = mBody + item.name + " x " + itemQuantities[index] + "\n"
                    }
                    else {
                        dataAll = dataAll + data + ",";
                        mBody = mBody + item.name + " x " + itemQuantities[index] + "\n"
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
                if(placeOrder){
                    axios(config)
                    .then(function (response) {
                        setCheckedOut(true);
                        setTimeout(() => { navigate('/') }, 3000)
                        console.log(JSON.stringify(response.data));
                        checkIfEnough();
                        if (isEnough) {
                            if (wallet.amount > total) {
                                products.forEach((item, index) => {
                                    console.log(item.id);
                                    handleDelete(item.id);
                                    handleStockChange(item.id, item.stock - itemQuantities[index]);
                                });
                                updateWallet();
                                var data = JSON.stringify({
                                    "recipient": localStorage.getItem('email'),
                                    "msgBody": mBody,
                                    "subject": "Aggarwal's Online Super Market Order Placed"
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

                            }
                            else {
                                setIsEnough(false);
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
            else {
                setIsEnough(false);
            }
        }
        else {
            setTimeout(() => setIsEnough(true), 2000)
        }

    }

    return checkedout ? (
        <div style={{height:"100vh"}}>
        <Stack spacing={2} sx={{alignContent:"center"}} style={{paddingTop:"10%"}}>
            <h1 style={{fontSize:"3rem"}}>Your order has been recieved</h1>
            <CheckCircleIcon style={{fontSize:"5rem",color:"#82CD47",margin:"2% auto"}}/>
            <h1 style={{fontSize:"2rem"}}>Thank you for your purchase</h1>
            <p>Redirecting you to home screen</p>
            </Stack>
        </div>
    )
        :
        (<div className="checkout">
            <BrandBar />
            <h1 className='checkoutheading'>Checkout</h1>
            <Grid container columnSpacing={10} className="checkoutgrid">
                <Grid item xs={8} className="checkoutform">
                    <Stack spacing={5} className="stack">

                        <TextField
                            label="Address"
                            defaultValue={address}
                            variant="outlined"
                            sx={{ width: 600, alignSelf: 'center' }}
                            value={address}
                            onChange={handleAddress}
                        />
                        <hr></hr>


                        {products.map((product, index) => {
                            return (<Stack divider={<></>}>  <CartItem
                                className="checkoutcartitem"
                                key={index}
                                image={product.image}
                                description={product.description}
                                price={product.price}
                                name={product.name}
                                quantity={itemQuantities[index]}
                                isDeletable={false}
                                isOrder ={false}
                                allproducts ={false}
                                handledelete={() => {


                                    handleDelete(product.id);


                                }}


                            /></Stack>)
                        })}
                    </Stack>
                </Grid>

                <Grid item xs={4}>
                    <Card className="checkoutpagecard">
                        <Stack spacing={1}>
                            <p>Subtotal: ₹{total}</p>
                            <Stack direction="row" spacing={4}><p>Wallet Balance: ₹{wallet.amount}</p><AddCircleIcon onClick={() => { navigate('/wallet') }} /></Stack>
                            <Button
                                className='checkoutpagebutton'
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
            {!isEnough ? (<Alert className="alert error" variant="danger" onClose={() => setIsEnough(true)}>
                <p><CancelIcon />&nbsp;&nbsp;{errorm}</p>
            </Alert>) : (<></>)}
        </div>);

}




export default Checkout;