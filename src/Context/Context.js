import { faker } from "@faker-js/faker";
import { createContext, useContext, useReducer } from "react";
import { cartReducer, productReducer } from "./Reducer";

var Cart = createContext()
faker.seed();
const Context = ({children}) => {

    const products = [...Array(30)].map(() => ({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.avatar(),
        inStock: faker.helpers.arrayElement([0,3,4,5,8,9]),
        fastDelivery: faker.datatype.boolean(),
        rating:faker.helpers.arrayElement([1,2,3,4,5])

    }))
    //console.log(products)

    const [state, dispatch] = useReducer(cartReducer,{
        products: products,
        cart:[]
    })

    const [prodState, prodDispatch] = useReducer(productReducer,{
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery:""
    })

    return <Cart.Provider value={{state,dispatch,prodState,prodDispatch}}>{children}</Cart.Provider>
}

export default Context;

export const CartState = () => {
    return useContext(Cart)
}

