import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { ADD_TO_FAVORITE ,REMOVE_TO_FAVORITE,ADD_TO_CART} from '../store/Slice'

import { Link } from 'react-router-dom'
const Favirote = () => {

  const dispatch = useDispatch() 
 
  const Favorite = useSelector((state)=>state.slice.Favorite)


console.log("Favorite")

  return (
    <div className='cardBody'>
      {
      Favorite.length > 0 ?
      Favorite?.map((card,i)=>{
        return(
              
               <div class="img-card iCard-style1" key={i}>
                   
                    <div class="card-content">
                        <div class="card-image">
                            {/* <span class="card-title">Cloud Beauty</span> */}
                            {/* <span class="card-title">{card.recipe.mealType}</span> */}
                          <img src={card?.recipe?.image}  alt="image"/>
                         
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
                        <span onClick={() => dispatch(ADD_TO_CART(card))}>🛒</span>
                        <span onClick={() => dispatch(REMOVE_TO_FAVORITE(i))}>🗑️</span>
                        {/* <span onClick={()=> dispatch(ADD_TO_FAVORITE(card))}>❤️</span> */}
                       
                    </div>
    
                </div>   
               
            
             
        )
    })
: <div className="favorite">
  <div>
    <img src='https://static.vecteezy.com/system/resources/thumbnails/008/480/752/small/red-heart-icon-simple-doodle-illustration-with-red-heart-icon-free-png.png' alt="heart"></img>
    <h1>You haven't liked anything yet</h1>
    <Link to="/">Discover</Link>
  </div>
  </div>}


      </div>
  )
}

export default Favirote