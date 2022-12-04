import { Card } from "@mui/material";
import { Stack,Button } from "@mui/material";

import './productcard.css';


export default function ProductCard(props) {


    const cartItemEndpoint = "http://localhost:8080/oops/api/cartItem";

    const postreq = async(data)=>{
        await fetch(cartItemEndpoint,{method:'post',headers:{'Content-Type':'application/json'},body: JSON.stringify(data)})
        }

    const handleClick =(event)=>{
        const data = 
            [{
                "uid":localStorage.getItem('uid'),
                "pid":props.prodid,
                quantity:1
            }]

           
        postreq(data);
       
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <Stack spacing={1} className ="Stack">
                <img src={props.img} className="img" />
                <h4 className="prodname">{props.name}</h4>
                <p className="desc">{props.description}</p>

                <h4>₹{props.price}</h4>

               

                <Button variant="contained" className ="button"
                    sx={{
                        width: 100,
                        alignSelf: 'center'
                    }}
                    onClick ={handleClick}
                    
                    >Add</Button>


            </Stack>
        </Card>

    );
}