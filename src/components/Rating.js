import React, { useState } from 'react'
import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
import './styles.css';

function Rating({rating,onClick,style}) {
    
  return (
    <div>
        {[...Array(5)].map((_,i) => (
            <span key={i} onClick={() => onClick(i)} style={style}>
            {rating > i ? (
                <AiFillStar fontSize='20px' color='pink'/>
            ) : (
                <AiOutlineStar fontSize='20px'/>
            )}
            </span>
  ))}
    </div>
  )
}

export default Rating