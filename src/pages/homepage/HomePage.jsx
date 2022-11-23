import { Stack } from '@mui/system';
import { useState, useEffect } from 'react';

import SearchBar from '../../components/appbar/SearchBar';
import { Grid } from '@mui/material';

import AvatarText from '../../components/avatartext/AvatarText';
// import './homepage.css';



function HomePage(){

    const categEndPoint = "http://localhost:8080/oops/api/category";

    const [categories, setCategories] = useState([]);

    const getCategs = async () => {
        
        const response = await fetch(categEndPoint);
        const myJson = await response.json(); //extract JSON from the http response
        console.log(myJson);
        setCategories(myJson)
        
        
        }
    
    useEffect(()=>{
        getCategs();
    },[]);


    return (
        <div>
            <SearchBar/>
            <Stack direction="row" spacing={5} className="Stack">
            <Grid container columnSpacing={0} rowSpacing={5}>
            {categories.map((category,index)=>{
                return <Grid item xs={2}><AvatarText
                    key = {index}
                    name={category.name}
                    img = {category.image}
                /></Grid>
            })}
            </Grid>
            </Stack>
        </div>
    )
}

export default HomePage;