import React from 'react'
import { Box } from "@mui/material";
import { CartState } from '../Context/Context'
import SingleProduct from './SingleProduct';
import './styles.css';
import Filter from './Filter';


function Home() {
  const { state: { products }, prodState: { byStock, byFastDelivery, sort, byRating, searchQuery },
    prodDispatch } = CartState()

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === 'lowToHigh' ? a.price - b.price : b.price - a.price
      )
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock)
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((prod) => prod.rating === byRating)
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>

        prod.name.toString().toLowerCase().includes(searchQuery)

      )
    }
    return sortedProducts
  }
  console.log(products);
  return (
    <div>
      <Box gridColumn="span 4"
        gridRow="span 2"
        mt="90px"
        p="0 30px">
        
          <Filter />
          <div>


            <div className='productContainer'>
              {transformProducts().map((prod) => {
                return <SingleProduct prod={prod} key={prod.id} />
              })}
            </div>


          </div>


        
      </Box>
    </div>
  )
}

export default Home