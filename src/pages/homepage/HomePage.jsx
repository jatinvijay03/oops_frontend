import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Slider from "react-slick";

import SearchBar from '../../components/appbar/SearchBar';
import { Grid, Button } from '@mui/material';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import AvatarText from '../../components/avatartext/AvatarText';
import './homepage.css';
import Slideshow from '../../components/carousel/Slideshow';




function HomePage() {

    const categEndPoint = "http://localhost:8080/oops/api/category";

    const [categories, setCategories] = useState([]);
    const [searchInput, setSearch] = useState("");

    const getCategs = async () => {

        const response = await fetch(categEndPoint);
        const myJson = await response.json(); //extract JSON from the http response
        setCategories(myJson)


    }

    useEffect(() => {
        getCategs();
    }, []);

    const navigate = useNavigate();

    const handleSearchInput = (event) => {
        setSearch(event.target.value);

    }

    const handleSearchButtonClick = (event) => {
        if (searchInput !== "") {
            navigate('/products/' + searchInput)

        }
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 7,
    };



    if (localStorage.getItem('uid')) {
        return (
            <div>
                <SearchBar
                    searchvalue={searchInput}
                    searchfunction={handleSearchInput}
                    searchbuttonfunction={handleSearchButtonClick}

                />
                <Slideshow/>
                <Slider {...settings} className="categSlider">
                    {categories.map((category, index) => {
                        return <div key={index}>
                            <Grid key={index} item xs={2}>
                                <Button key={index} onClick={() => { navigate('products/category=' + category.id) }} >
                                    <AvatarText
                                        key={index}
                                        name={category.name}
                                        img={category.image}
                                    />
                                </Button>
                            </Grid>
                        </div>
                    })}
                </Slider>
            </div>
        )
    }

    else {
        navigate('login')
    }


}

export default HomePage;