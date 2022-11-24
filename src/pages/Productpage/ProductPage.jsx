import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";


import { Grid } from "@mui/material";

import ProductCard from "../../components/productcard/ProductCard";
import SearchBar from "../../components/appbar/SearchBar";

import './productpage.css'

export default function ProductPage() {

    const prodEndPoint = "http://localhost:8080/oops/api/product";
    const categEndPoint = "http://localhost:8080/oops/api/category";
    const [products, setProducts] = useState([]);
    const [searchInput, setSearch] = useState("");
    


    const params = useParams();
    const [searchvalue,setSearchValue] = useState(params.categId);

    const navigate = useNavigate();

    

    const getCategs = async () => {

        const response = await fetch(prodEndPoint);
        const myJson = await response.json();
        // const response2 = await fetch(categEndPoint);
        // const myJson2 = await response2.json(); //extract JSON from the http response
        setProducts(myJson.filter(function (item) {
            return (item.category_id == (searchvalue)||item.name.toLowerCase().includes(searchvalue));
        }))


    }

    const handleSearchInput = (event) => {
        setSearch(event.target.value);

    }

    const handleSearchButtonClick = (event) => {
        setSearchValue(searchInput)
        
        navigate('/products/'+(searchInput));
    }

    

    useEffect(() => {
        getCategs();
    }, [searchvalue]);

    return (
        <div>
            <SearchBar
                searchvalue={searchInput}
                searchfunction={handleSearchInput}
                searchbuttonfunction={handleSearchButtonClick}

            />
            <Grid container rowSpacing={10} columnSpacing={5} className="grid">
                {products.map((product, index) => {
                    return <Grid key={index} item xs={3}>
                        <ProductCard
                            key={index}
                            name={product.name}
                            img={product.image}
                            description={product.description}
                            price={product.price}
                        /></Grid>
                })}

            </Grid>
        </div>
    )
}