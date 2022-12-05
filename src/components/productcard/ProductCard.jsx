import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import './productcard.css';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';

function ProductCard(props) {



  return (
    <Card style={{ width: '16rem' }} className="card">
      <Card.Img className="img" variant="top" src={props.img} />
      <Card.Body>
        <Card.Title className="prodname">{props.name}</Card.Title>
        <Card.Text className="desc">
          {props.description}
        </Card.Text>
      </Card.Body>

      <ListGroup.Item>₹{props.price}</ListGroup.Item>

      <Card.Body>
        <Button variant="success" onClick={props.handleClick}>Add To Cart</Button>{' '}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;