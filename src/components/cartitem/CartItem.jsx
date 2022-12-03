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
                    <h5 className="price">
                        {props.price}
                    </h5>
                </Stack>

            </Card>
        </div>
    )

}