import { Card, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

import './cartitem.css';
import { Button } from "react-bootstrap";





export default function CartItem(props) {


    
    

    return (
        <div className="cartItem">

            <Stack direction="row" >
                <img className="image" src={props.image} />
                <Stack sx={{ alignItems: "flex-start", width: 290 }}>
                    <p className="name">{props.name}</p>
                    <h6>₹{props.price}</h6>
                </Stack>

                <h5 className="quantity">
                    {props.quantity}
                </h5>
                <Stack spacing={2}><h5 className="price">
                    ₹{+parseInt(props.price) * parseInt(props.quantity)}
                </h5>
                    <Button onClick={props.handledelete} variant="outline-light">
                        <DeleteIcon className="delete" sx={{ alignSelf: "center" }} />
                    </Button>
                </Stack>



            </Stack>


        </div>
    )

}