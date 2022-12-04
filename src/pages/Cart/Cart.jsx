import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../components/appbar/SearchBar";
import CartItem from "../../components/cartitem/CartItem";
import axios from "axios";

import './cart.css'

export default function Cart() {

    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem/";
    const prodEndPoint = "http://localhost:8080/oops/api/product";

    const [products, setProducts] = useState([])
    const [itemQuantities, setitemQuantities] = useState([])

    const getCartItems = async () => {
        var cartItemEndpointuid = cartItemEndpoint + localStorage.getItem('uid');
        const response = await fetch(cartItemEndpointuid);
        const myJson = await response.json();
        console.log(myJson);
        var produ = []
        var quantities = []

        myJson.forEach(async (element) => {
            const response2 = await fetch(prodEndPoint + "/pid=" + element.pid);
            const myJson2 = await response2.json();
            console.log(myJson2);
            produ.push(myJson2);
            quantities.push(element.quantity);
            setProducts(produ);
            setitemQuantities(quantities);
        });
    }

    // useEffect(() => {
    //     var cartItemEndpointuid = cartItemEndpoint + localStorage.getItem('uid');
    //     axios.get(cartItemEndpointuid).then((response) => {
    //       setCart(response.data).then(() => {
    //         var p = []
    //         var quantities = []
    //         cartItems.forEach(async (element) => {
    //             axios.get(prodEndPoint+ "/pid=" + element.pid).then((respons) => {
    //                 p.push(respons);
    //                 quantities.push(element.quantity);
    //                 setProducts(p);
    //                 setitemQuantities(quantities);
    //             })
    //         })
    //       });
    //     });
    //   }, []);

    useEffect(() => { getCartItems()
     }, []);
    
    return (
        <div className="Cart">
            <PrimarySearchAppBar />
            {products.length===0?
            (<h1>No Items in Your Cart!</h1>):
            (<Stack className="cart">
                {products.map((item, index) => {
                    return (
                        <CartItem
                            img={item.image}
                            price={item.price}
                            quantity = {itemQuantities[index]}
                            description={item.description}
                            name={item.name}
                            key={item.id}
                        />
                    )
                })}
            </Stack>)}


        </div>
    )
}