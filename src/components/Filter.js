import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import './styles.css';
import Rating from './Rating';
import { CartState } from '../Context/Context';

function Filter() {
    const [rate, setRate] = useState();
    const {
        prodState: { byStock, byFastDelivery, sort, byRating, searchQuery },
        prodDispatch
    } = CartState();
    return (
        <div className='filters'>
            <span className='title'>Filter Products</span>
            <span>
                <Form.Check inline label='Ascending' name='group1' type='radio' id={'inline-1'} onChange={()=> prodDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"lowToHigh"
                })} checked={sort==='lowToHigh'? true:false}/>
            </span>
            <span>
                <Form.Check inline label='Descending' name='group1' type='radio' id={'inline-2'} onChange={()=> prodDispatch({
                    type:"SORT_BY_PRICE",
                    payload:"highToLow"
                })} checked={sort==='highToLow'? true:false}/>
            </span>
            <span>
                <Form.Check inline label='Include out of Stock' name='group1' type='checkbox' id={'inline-3'} onChange={()=>
                prodDispatch({
                    type: 'FILTER_BY_STOCK'
                })} checked={byStock}/>
            </span>
            <span>
                <Form.Check inline label='Fast Delivery Only' name='group1' type='checkbox' id={'inline-4'} onChange={()=>
                    prodDispatch({
                        type: 'FILTER_BY_DELIVERY'
                    })} checked={byFastDelivery}/>
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating</label>
                <Rating rating={byRating} style={{ cursor: 'pointer' }} onClick={(i) => 
                    // setRate(i + 1)
                    prodDispatch({
                        type:"FILTER_BY_RATING",
                        payload:i+1
                    })
                } />
            </span>

            <span style={{ paddingLeft: 10 }}>
                <Button variant='light' onClick={() =>{
                    prodDispatch({
                        type: 'CLEAR_FILTER',            
                    })
                }}>Clear Filter</Button>
            </span>
        </div>
    )
}

export default Filter