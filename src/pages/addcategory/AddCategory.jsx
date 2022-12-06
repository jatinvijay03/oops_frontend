import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { Card } from "@mui/material";
import { Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../components/appbar/SearchBar'

import LabelText from "../../components/labeltext/LabelText";


import './addcategory.css';

function AddCategory() {

    const categEndPoint = "http://localhost:8080/oops/api/category";
    const productEndPoint = "http://localhost:8080/oops/api/product";

    const WIDTH = 400;

    const [category, setCategory] = useState("");
    const [img, setImg] = useState("");
    const [searchInput, setSearch] = useState("");
    const [products, setProducts] = useState([]);

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
            const response = await fetch(productEndPoint + "/category=" + searchvalue.substring(a + 1));
            const myJson = await response.json();
            setProducts(myJson)
        }
        else {
            const response = await fetch(productEndPoint + "/q=" + searchvalue);
            const myJson = await response.json();
            // const response2 = await fetch(categEndPoint);
            // const myJson2 = await response2.json(); //extract JSON from the http response
            setProducts(myJson)
        }
    }
    useEffect(() => {
        getCategs();

    }, [searchvalue]);

    const navigate = useNavigate();

    const handleCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleImg = (event) => {
        setImg(event.target.value);
    }

    const handleClick = (event)=>{

        const data = [
            {
                "name" : category,
                "image":img
            }
        ]

        fetch(categEndPoint, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log('Success:', data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
    }


    return (
        <div className='AddCategory'>
            <SearchBar
            searchvalue={searchInput}
            searchfunction={handleSearchInput}
            searchbuttonfunction={handleSearchButtonClick}
        />
            <Card className='AddProduct'
                variant="outlined"

                sx={{ width: 600, alignSelf: 'center', }}
            >
                <Stack spacing={3} className="Stack">
                    <LabelText
                        width={WIDTH}
                        variable={category}
                        function={handleCategory}
                        labelName="Category: "
                    />
                    <LabelText
                        width={WIDTH}
                        variable={img}
                        function={handleImg}
                        labelName="Image URL: "
                    />
                    
                    <Button variant="custom" onClick={handleClick}>Add Category</Button>{' '}
                </Stack>
            </Card>
        </div>
    );
}

export default AddCategory;