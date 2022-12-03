import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PrimarySearchAppBar from "../../components/appbar/SearchBar";
import CartItem from "../../components/cartitem/CartItem";

import './cart.css'

export default function Cart() {

    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem/1";
    const prodEndPoint = "http://localhost:8080/oops/api/product";

    const [cartItems, setCart] = useState([])

    const getCartItems = async () => {
        const response = await fetch(cartItemEndpoint);
        const myJson = await response.json();
        var products = []

        myJson.forEach(async (element) => {
            const response2 = await fetch(prodEndPoint + "/pid=" + element.pid);
            const myJson2 = await response2.json();
            console.log(myJson2);
            products.push(myJson2);
            setCart(products);
        });

    }

    useEffect(() => { getCartItems() }, []);

    return (
        <div className="Cart">
            <PrimarySearchAppBar />
            {cartItems.length===0?
            (<h1>No Items in Your Cart!</h1>):
            (<Stack className="cart">
                {cartItems.map((item, index) => {
                    return (
                        <CartItem
                            img={item.image}
                            price={item.price}
                            description={item.description}
                            name={item.name}
                            key={index}
                        />
                    )
                })}
            </Stack>)}


        </div>
    )
}