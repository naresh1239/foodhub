import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {  ADD_TO_CART ,ADD_TO_FAVORITE} from '../store/Slice'
import { Link } from 'react-router-dom'
console.log('cardsilder')
const Cardslide = () => {
    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.slice.AllCartList)

  return (

<div className='card-slider'>
{
        cartData?.slice(0,5).map((card,i)=>{
            return(
                   <div class="img-card iCard-style1" key={i}>
                       
                       
                            <div class="card-image">
                                {/* <span class="card-title">Cloud Beauty</span> */}
                                {/* <span class="card-title">{card.recipe.mealType}</span> */}
                              <img src={ card?.recipe?.images.SMALL.url}  alt="image"/>
                             
                            </div>
          
                            
                            <div class="card-text">
                            <Link to={`details/${card?._links?.self?.href?.split("/")[6]}`} >
                              <div className="heading">
                              <p >{card?.recipe?.label}</p>
                                <p>{card?.recipe?.dishType}</p>
                              </div>
                                
            
                              <p>{card?.recipe?.mealType}</p>
                              <div className="cal">
                                <p>calories {card?.recipe?.calories?.toString()?.split(".")[0]}</p>
                                <p>ingredients {card?.recipe?.ingredients?.length}</p>

                                

                              </div>
                              </Link>
                  </div>
                            
                       
        
                        <div class="card-link" >
                          {true != false ? 
                          <>
                           <span onClick={() => {dispatch(ADD_TO_CART(card)) }}>🛒</span>
                            <span onClick={()=> {dispatch(ADD_TO_FAVORITE(card)) }}>❤️</span>
                            </>
:
<>
                             <Link to="auth"><span>🛒</span></Link>
                             <Link to="auth"><span >❤️</span></Link>
                            </>
                           }
                      
                        </div>
                    </div>   
                   
               
                 
            )
        })
      }
</div>
  )
}

export default Cardslide