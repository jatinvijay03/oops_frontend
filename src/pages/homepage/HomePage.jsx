import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import SearchBar from '../../components/appbar/SearchBar';
import { Grid, Button } from '@mui/material';


import AvatarText from '../../components/avatartext/AvatarText';
// import './homepage.css';



function HomePage() {

    const categEndPoint = "http://localhost:8080/oops/api/category";

    const [categories, setCategories] = useState([]);
    const [searchInput, setSearch] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

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
        if(searchInput!=="")
        {
            navigate('/products/'+searchInput)
            
        }
    }




    return (
        <div>
            <SearchBar
                searchvalue={searchInput}
                searchfunction={handleSearchInput}
                searchbuttonfunction={handleSearchButtonClick}

            />
            <Stack direction="row" spacing={5} className="Stack">
                <Grid container columnSpacing={0} rowSpacing={5}>
                    {categories.map((category, index) => {
                        return <Grid key={index} item xs={2}>
                            <Button key={index} onClick={() => { navigate('products/' + category.id) }}>
                                <AvatarText
                                    key={index}
                                    name={category.name}
                                    img={category.image}
                                />
                            </Button>
                        </Grid>
                    })}
                </Grid>
            </Stack>
        </div>
    )
}

export default HomePage;