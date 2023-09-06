import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, ADD_TO_CART, REMOVE_TO_CART } from '../store/Slice'
import { Link } from 'react-router-dom'
const CartPage = () => {
  const cart = useSelector((state) => state.slice.cart)
  const dispatch = useDispatch()
  return (
    
  <div className='cardBody'>
   {
cart?.length > 0 ?
    
cart?.map((card,i)=>{
    return(
          
           <div class="img-card iCard-style1" key={i}>
               
                <div class="card-content">
                    <div class="card-image">
                        {/* <span class="card-title">Cloud Beauty</span> */}
                        {/* <span class="card-title">{card.recipe.mealType}</span> */}
                      <img src={ card?.recipe?.image}  alt="image"/>
                     
                    </div>
                    
                    <div class="card-text">
                     <p>
                        {card?.recipe?.label}
                        </p>
                        <p>dishType : <i>{card?.recipe?.dishType}</i></p>
            <i>totalWeight : {card?.recipe?.totalWeight}</i>
            <br/>
          <i>mealType : {card?.recipe?.mealType}</i>
    </div>
                    
                </div>

                <div class="card-link" >
                    {/* <span onClick={() => dispatch(ADD_TO_CART(card))}>🛒</span> */}
           
                    <span onClick={() => dispatch(REMOVE_TO_CART(i))}>🗑️</span>
                </div>

            </div>   
           
        
         
    )
})
: <div className="without-cart">
<div className='without-cart_main'>
  <img src='https://png.pngtree.com/png-clipart/20230405/original/pngtree-cart-vector-icon-design-illustration-png-image_9027679.png' alt="heart"></img>
  <h1>You haven't add anything yet</h1>
  <Link to="/">Discover</Link>
</div>
</div>}
  </div>
  )
}

export default CartPage