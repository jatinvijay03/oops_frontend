import { Card, Stack } from "@mui/material";

import './cartitem.css';





export default function CartItem(props) {
    return (
        <div className="cartItem">
            <Card variant="outlined" sx={{width:1300}}>
                <Stack direction="row">
                    <img className="img" src={props.img} />
                    <Stack>
                        <h3 className="name">{props.name}</h3>
                        <h4 className="desc">{props.description}</h4>
                    </Stack>
                    <Stack>
                    <h5 className="quantity">
                        {props.quantity}
                    </h5>
                    <h5 className="price">
                        {parseInt(props.price) * parseInt(props.quantity)}
                    </h5>
                    </Stack>
                </Stack>

            </Card>
        </div>
    )

}