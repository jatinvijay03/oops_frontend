import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import './productcard.css';

function ProductCard(props) {


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
    <Card style={{ width: '16rem' }} className= "card">
      <Card.Img className="img" variant="top" src={props.img} />
      <Card.Body>
        <Card.Title className="prodname">{props.name}</Card.Title>
        <Card.Text className="desc">
          {props.description}
        </Card.Text>
      </Card.Body>
      
        <ListGroup.Item>₹{props.price}</ListGroup.Item>
      
      <Card.Body>
      <Button variant="success" onClick={handleClick}>Add To Cart</Button>{' '}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;