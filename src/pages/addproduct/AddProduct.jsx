import { useState,useEffect } from 'react';

import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import LabelText from "../../components/labeltext/LabelText"
import './addproduct.css';



function AddProduct() {

   
    const categEndPoint = "http://localhost:8080/oops/api/category";
    const productEndPoint = "http://localhost:8080/oops/api/product";

    const WIDTH = 400;

    const [product, setProduct] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [categId, setCategId] = useState("");
    const [categories, setCategories] = useState([]);

    // const [, handle] = useState("");
    // const [, handle] = useState("");

    const handleProduct = (event) => {
        setProduct(event.target.value);
    }
    const handlePrice = (event) => {
        setPrice(event.target.value);
    }
    const handleDescription = (event) => {
        setDescription(event.target.value);
    }
    const handleImg = (event) => {
        setImg(event.target.value);
    }


    const handleChange = (event)=>{
        setCategId(event.target.value);
    }

   const handleClick = (event)=>{
        const data = [{
            "name":product,
            "description":description,
            "image":img,
            "price":price,
            "category_id":categId,
        }]

        fetch(productEndPoint, {
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
        <div >
            <Card className='AddProduct'
                variant="outlined"

                sx={{ width: 600, alignSelf: 'center', }}
            >
                <Stack spacing={2} className="Stack">

                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categId}
                            label="Category"
                            onChange={handleChange}
                            defaultValue = ""
                        >
                        {categories.map((category,index) => {
                            return <MenuItem key={index} value = {category.id}>{category.name}</MenuItem>
                        })}


                            
                        </Select>
                       
                    </FormControl>
                    
                    <LabelText
                        width={WIDTH}
                        variable={product}
                        function={handleProduct}
                        labelName="Product: "
                    />
                    <LabelText
                        width={WIDTH}
                        variable={price}
                        function={handlePrice}
                        labelName="Price: "
                        defaultValue = ""
                    />
                    <LabelText
                        width={WIDTH}
                        variable={description}
                        function={handleDescription}
                        labelName="Description: "
                    />
                    <LabelText
                        width={WIDTH}
                        variable={img}
                        function={handleImg}
                        labelName="Image URL: "
                    />
                    <Button
                        variant="contained"
                        sx={{
                            width: 200,
                            alignSelf: 'center'

                        }}
                        onClick = {handleClick}
                        className=""

                    >
                        Add Product
                    </Button>
                </Stack>



            </Card>
        </div>

    );
}

export default AddProduct;
