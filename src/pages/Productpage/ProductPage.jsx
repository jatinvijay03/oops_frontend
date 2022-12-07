import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



import { Grid } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Alert } from "react-bootstrap";

import ProductCard from "../../components/productcard/ProductCard";
import SearchBar from "../../components/appbar/SearchBar";


import './productpage.css'

export default function ProductPage() {

    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const categEndPoint = "http://localhost:8080/oops/api/category";
    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem";
    const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [isError, setisError] = useState(false);




    const params = useParams();
    const [searchvalue, setSearchValue] = useState(params.query);

    const navigate = useNavigate();



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

    const handleSearchInput = (event) => {
        setSearch(event.target.value);

    }

    const handleSearchButtonClick = (event) => {
        setSearchValue(searchInput)

        navigate('/products/' + (searchInput));
    }



    useEffect(() => {
        getCategs();
    }, [searchvalue]);



    const postreq = async (data) => {
        await fetch(cartItemEndpoint, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    }

    const handleClick = (event, stock) => {
        if(stock < 1){
            setisError(true);
            setTimeout(() => setisError(false), 2000)
        }
        else{
            const data =
            [{
                "uid": localStorage.getItem('uid'),
                "pid": event,
                quantity: 1
            }]
            postreq(data);
            setShow(true);
            setTimeout(() => setShow(false), 2000)
        }
        
    }


    if (localStorage.getItem('uid')) {
        return (
            <div className="products">
                <SearchBar
                    searchvalue={searchInput}
                    searchfunction={handleSearchInput}
                    searchbuttonfunction={handleSearchButtonClick}

                />

                {products.length === 0 ?
                    (<h1>No Results Found</h1>) :
                    (<Grid container rowSpacing={10} columnSpacing={5} className="grid">
                        {products.map((product, index) => {
                            return <Grid key={index} item xs={3} rowSpacing={0}>
                                <ProductCard
                                    key={index}
                                    name={product.name}
                                    img={product.image}
                                    description={product.description}
                                    price={product.price}
                                    stock={product.stock}
                                    handleClick={() => handleClick(product.id, product.stock)}
                                /></Grid>
                        })}

                    </Grid>)}
                {isError ? (<Alert className="alert error" variant="danger" onClose={() => setisError(false)}>
                                    <p><CancelIcon />&nbsp;&nbsp;Not enough in stock</p>
                                </Alert>) : (<></>)}
                {show ? (<Alert className = "alert" variant="success" onClose={() => setShow(false)}>
                    <p><CheckCircleIcon/>&nbsp;&nbsp;Item Added to cart</p>
                </Alert>) : (<></>)}
            </div>
        )
    }
    else {
        return (
            <h1>You're not logged in</h1>
        )
    }

}