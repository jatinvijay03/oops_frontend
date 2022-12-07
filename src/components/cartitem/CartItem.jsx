import { Card, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import './cartitem.css';
import { Button } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import axios from "axios";

export default function CartItem(props) {

    const [stock, setStock] = useState(props.stock);


    const handleStock = (event) => {
        setStock(event.target.value);
    }

    const handleStockPressed = (id, stock) =>{
        var data = JSON.stringify({
            "id": id,
            "stock": stock,
            "name": "yes"
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8080/oops/api/product/updatestock',
            headers: { 
              'Content-type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          
    }


    const styles = theme => ({
        notchedOutline: {
          borderWidth: "1px",
          borderColor: "yellow !important"
        }
      });

    return (
        <div className="cartItem">

            <Stack direction="row" >
                <img className="image" src={props.image} />
                <Stack sx={{ alignItems: "flex-start", width: 290 }}spacing={2}>
                    <p className="name">{props.name}</p>
                    {props.isOrder?(<h6>Price: ₹{props.price} </h6>):(<h6>₹{props.price} </h6>)}
                    
                </Stack>

                
                {props.isOrder?(<h5 className="quantity">Qty:{props.quantity} </h5>):(<h5 className="quantity">{props.quantity} </h5>)}
                
                <Stack spacing={2}>{props.allproducts?(<></>):(<h5 className="price">
                    Total: ₹{parseInt(props.price) * parseInt(props.quantity)}
                    
                </h5>)}
                
                    {(props.isDeletable)?(<Button onClick={props.handledelete} variant="text">
                        <DeleteIcon className="delete" sx={{ alignSelf: "center" }} />
                    </Button>):(<></>)}
                    {(props.isOrder)?(<p className="name">Date: {props.date}</p>):(<></>)}

                    <Stack direction="row" >
                    {props.allproducts?(<TextField
                            inputProps={{
                                style: {
                                padding: 7,
                                }
                            }}
                            className="textstock"
                            defaultValue={props.stock}
                            variant="outlined"
                            sx={{ border: '1px solid white',marginLeft: '1rem auto',borderRadius: 1, width: 50, input: { color: 'white' } ,alignSelf: 'center' }}
                            value={stock}
                            onChange={handleStock}
                        />):(<></>)}

                    {(props.allproducts)?(<Button onClick={handleStockPressed(props.id, stock)} variant="text">
                        <CheckIcon className="check" sx={{ alignSelf: "center" }} />
                    </Button>):(<></>)}
                    </Stack>

                    
                   
                </Stack>



            </Stack>


        </div>
    )

}