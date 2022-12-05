import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../components/appbar/SearchBar";
import CartItem from "../../components/cartitem/CartItem";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import './cart.css'
import { Button } from "react-bootstrap";
import { Grid } from "@mui/material";
import { Card } from "react-bootstrap";

export default function Cart() {

    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem/";
    const prodEndPoint = "http://localhost:8080/oops/api/product";

    const navigate = useNavigate();


    const [products, setProducts] = useState([])
    const [itemQuantities, setitemQuantities] = useState([])
    const [total, setTotal] = useState(0);
    const [cart,setCart] = useState([]);
    const [searchInput, setSearch] = useState("");




    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

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
            subtotal += myJson2.price*element.quantity;

            produ.push(myJson2);
            quantities.push(element.quantity);
            setProducts(produ);
            setitemQuantities(quantities);
            setTotal(subtotal);

        });

    }

    const goToCheckout = (event) => {
        navigate('/checkout')
    }

    useEffect(() => {
        getCartItems()
    }, []);


    const handleDelete = (pid)=>{
        
        var itemId = cart.filter(function(item){
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

        window.location.reload();
    }

    return (
        <div className="Cart">
            <PrimarySearchAppBar
            searchvalue={searchInput}
                    searchfunction={handleSearchInput}
                    searchbuttonfunction={handleSearchButtonClick}/>
            {products.length === 0 ?
                (<h1>No Items in Your Cart!</h1>) :
                (<div className="cart">
                    <Card className="checkoutcard">
                        <Stack direction='row' sx={{justifyContent:"space-between"}}>
                            <p><b>Subtotal: ₹{total}</b></p>
                            <Button onClick={goToCheckout} className="checkoutbutton">Checkout</Button>
                        </Stack>
                    </Card>


                    <Stack className="cartlist" divider={<hr></hr>} spacing={3}>
                        <Grid container spacing={2} >
                            <Grid item xs={4}><h6>Item</h6></Grid>
                            <Grid item xs={5}><h6>Quantity</h6></Grid>
                            <Grid item xs={2}><h6>Total</h6></Grid>




                        </Grid>


                        {products.map((product, index) => {
                            return (

                                <CartItem
                                    key={index}
                                    image={product.image}
                                    description={product.description}
                                    price={product.price}
                                    name={product.name}
                                    quantity={itemQuantities[index]}
                                    handledelete = {()=>{
                                        

                                        handleDelete(product.id);
                                        console.log(product.id);
                                        
                                        }}
                                    

                                />



                            )
                        })}
                    </Stack>
                    </div>
                )}
        </div>
    )
}


