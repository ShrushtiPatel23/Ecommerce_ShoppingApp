import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import './styles.css';
import Rating from './Rating';
import { CartState } from '../Context/Context'
import {FaRupeeSign } from 'react-icons/fa';

function SingleProduct({prod}) {
    const[rate,setRate] = useState(prod.rating);
    const {state:{cart},dispatch} = CartState()
    //console.log(prod);
  return (
     <div className='products'>
       <Card>
       <Card.Img src={prod.image} alt={prod.name} />
       <Card.Body>
       <Card.Title>
       {prod.name}
       </Card.Title>
       <Card.Subtitle>
       <span style={{paddingBottom:10}}><FaRupeeSign/>{prod.price.split(".")[0]}</span>
       {prod.fastDelivery ? (<div>Fast Delivery</div>) : (<div>4-5 days Delivered</div>)}
       <Rating rating = {rate} style={{cursor: 'pointer'}} onClick={(i) => setRate(i+1)}/>
       </Card.Subtitle>
       {cart.some((p)=>p.id === prod.id) ?
       (<Button onClick={() => {
        dispatch({
            type:'REMOVE_FROM_CART',
            payload:prod
        })
      }} variant="danger">Remove from Cart</Button>)
       :
      (<Button onClick={() => {
        dispatch({
            type:'ADD_TO_CART',
            payload:prod
        })
      }} disabled={!prod.inStock}>{!prod.inStock ? "Out Of Stock" :  "Add to Cart"}</Button>)}
       </Card.Body>
       </Card>
    </div>
  )
}

export default SingleProduct