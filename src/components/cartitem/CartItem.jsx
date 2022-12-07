import { Card, Stack } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import './cartitem.css';
import { Button } from "react-bootstrap";

export default function CartItem(props) {

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
                </Stack>



            </Stack>


        </div>
    )

}