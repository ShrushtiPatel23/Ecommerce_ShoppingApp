import React, { useState } from 'react';
import { Container, FormControl, Navbar, Nav,
    NavbarBrand, 
    Dropdown,
Badge, 
Button} from 'react-bootstrap';
import './styles.css';
import { Box,AppBar } from "@mui/material";
import {FaRupeeSign, FaShoppingCart} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CartState } from '../Context/Context';
import { AiFillDelete } from 'react-icons/ai';

function Header(props) {
    
    const {state:{cart}, prodDispatch, dispatch} = CartState();
    const [show,setShow] = useState(false);
    console.log(cart);
    return (
        <Box m="10px">
        <AppBar>
        <Navbar bg="dark" variant="dark" style={{height:80, display: 'flex'}}>
        <Container>
        <Navbar.Brand>
        <Link to='/'>Shopping Cart</Link>
        </Navbar.Brand>

        <Navbar.Text className='search'>
        <FormControl placeholder='serach product'
        style={{width:500}}
        className='m-auto' onChange={(e) => {
            console.log(e.target.value)
            prodDispatch({
                type:'FILTER_BY_SEARCH',
                payload: e.target.value
            })
        }}/>
        </Navbar.Text>

        <Nav className='nav1'>
        <Dropdown variant='success' show={show}>
        <Dropdown.Toggle onClick = {() => setShow(!show)}>
        <FaShoppingCart color="white" style={{fontSize:20}}/>
        <Badge >{cart.length}</Badge>
        </Dropdown.Toggle>

        <Dropdown.Menu >

        { cart.length>0 ? ( 
            <>
            {cart.map((prod) => (
                <>
                <span className='cartItem' key={prod.id}>
                <img className='cartItemImg' src={prod.image} alt={prod.name}/>
                <div className='cartItemDetail'>
                <span>{prod.name}</span>
                <span><FaRupeeSign/>{prod.price.split('.')[0]}</span>
                </div>
                <AiFillDelete color='red' fontSize='20px' style={{cursor:'pointer'}}
                onClick={() =>  dispatch({
                    type:'REMOVE_FROM_CART',
                    payload:prod
                })}/>
                
                </span>
                <Dropdown.Divider></Dropdown.Divider>
                </>
            ))}
            
            <Link to='/cart'>
            <Button onClick = {() => setShow(!show)} style={{width: '95%', margin: "0 10px"}}>
            Go to Cart
            </Button>
            </Link>
            </>
        ): (
        <span style={{padding:0}}>Cart is Empty</span>
        )}
        </Dropdown.Menu>
        </Dropdown>
        </Nav>
        </Container>
        </Navbar>    
        </AppBar>
        </Box>
    );
}

export default Header;