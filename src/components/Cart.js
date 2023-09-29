import React, { useEffect, useState} from 'react'
import { Box } from "@mui/material";
import { CartState } from '../Context/Context'
import { ListGroup, Button, Row, Col, Image, Form } from 'react-bootstrap';
import Rating from './Rating';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import {FaRupeeSign} from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';

function Cart() {
  const{state:{cart,products},dispatch}= CartState();
  const navigate = useNavigate();
  
  const [total,setTotal] = useState();

  useEffect(()=>{
    setTotal(cart.reduce((acc,curr) => acc+Number(curr.price)*curr.qty,0))
  },[cart])
  return (
    <Box display="flex "
            justifyContent="space-between"
        mt="90px"
        p="0 30px">
    <div className='home'>
    <div className='productContainer'>
    <ListGroup style={{width:'100%'}}>
    {cart.map((prod)=>(
      <ListGroup.Item>
      <Row>

      <Col md={2}>
      <Image src={prod.image} alt={prod.name} />
      </Col>

      <Col md={2}>
      <span>{prod.name}</span>
      </Col>

      <Col md={2}>
      <span><FaRupeeSign/>{prod.price}</span>
      </Col>

      <Col md={2}>
      <span><Rating rating = {prod.rating} onClick={() =>{}}/></span>
      </Col>

      <Col md={2}>
      <Form.Control as='select' onClick={(e)=>
        dispatch({
          type:'CHANGE_CART_QTY',
          payload:{
            id:prod.id,
            qty:e.target.value
          }
        })
      }>
      {[...Array(prod.inStock).keys()].map((x) => (
        <option key={x+1}>{x+1}</option>
      ))}
      </Form.Control>
      </Col>

      <Col md={2}>
      <Button type='button' variant='light' onClick={() => {
        dispatch({
          type:'REMOVE_FROM_CART',
          payload:prod
      })
      }}><AiFillDelete color='red' fontSize='20px'/></Button>
      </Col>
      </Row>
      </ListGroup.Item>
    ))}
    </ListGroup>
    </div>
    <Box>
    <div className='filters summary'>
    <span className='title'>Subtottal ({cart.length}) items</span>
    <span style={{fontWeight: 700, fontSize:20}}>Total: {total}</span>
    <Button onClick={()=>{
      dispatch({
        type:'REMOVE_ALL_CART',
    })
    
     navigate('/');
    }}>Proceed to CheckOut</Button>
    
    </div>
    
    </Box>
    </div>
    </Box>
  )
}

export default Cart