import './style.css';
import FoodLoader from "./FoodLoader.gif"
import spinner from "./spinner.gif"
import { memo } from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch ,useSelector} from "react-redux"
import {  ADD_TO_CART ,ADD_TO_FAVORITE,RESET_DATA_LIST,NEXT_PAGE} from '../store/Slice'
import Notification from "./Notification"
import Simmer from "./Simmer"
import { getItemlist } from "./API"
const Cart = () =>{
const [ImgURL, setImgURL] = useState(true)
const [shownotication, setShownotication] = useState({notifiacation : false, data : '', type : ""})
const dispatch = useDispatch()
const cartData = useSelector((state) => state.slice.AllCartList)
const Favorite = useSelector((state) => state.slice.Favorite)
const userActive = useSelector((state) => state.slice.userActive)
const Loader = useSelector((state) => state.slice.Loader)
const Next = useSelector((state) => state.slice.next)
const loadImg = () =>{
setImgURL(false)
}

useEffect(() => {
if (ImgURL === false){
setImgURL(true)
}
}, [cartData])

useEffect(() => {
  if(shownotication.notifiacation == true){
    
    const notifiacation =  setTimeout(() => {
      setShownotication({notifiacation : false, data : ''})
    }, 2000);
  
    return () => {
      clearTimeout(notifiacation)
    }
  }

}, [shownotication])
  

const getapi = async() =>{
  const data = await  getItemlist();
  if(data){ dispatch(RESET_DATA_LIST(data)) 
     dispatch(NEXT_PAGE(data?._links?.next?.href))}
  }

if(Loader) {return( <div className="cardBody">{Array(10).fill("").map((e,i)=><Simmer/>) }</div>) }




const AddToFavorate = (card) =>{
  setShownotication({notifiacation : true, data : card , type : "favorite"})
  dispatch(ADD_TO_FAVORITE(card)) 

}
const AddToCart = (card) =>{
  setShownotication({notifiacation : true, data : card , type : "cart"})
  dispatch(ADD_TO_CART(card)) 

}

return(
    <div className="cardBody">

    {

    cartData.length > 0 ?
    <>
    {
        cartData?.slice(5).map((card,i)=>{
            return(
                   <div class="img-card iCard-style1" key={i}>
                       
                       
                            <div class="card-image">
                                {/* <span class="card-title">Cloud Beauty</span> */}
                                {/* <span class="card-title">{card.recipe.mealType}</span> */}
                              <img src={ImgURL ? FoodLoader :  card?.recipe?.images.SMALL.url} onLoad={loadImg} alt="image"/>
                             
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
                          {userActive != false ? 
                          <>
                            
                          <span onClick={()=>AddToFavorate(card)}>❤️</span>
                          <span onClick={()=>AddToCart(card)}>🛒</span>
                          
                            </>
:
<>              
                            <Link to="auth"><span >❤️</span></Link>
                             <Link to="auth"><span>🛒</span></Link>
                            
                            </>
                           }
                      
                        </div>
                    </div>   
                   
               
                 
            )
        })
      }
      {
        Next?.length > 0 ? <>
          <Simmer/>
      <Simmer/>
      <img src={spinner} alt="spinner"></img>
        </> : null
      }
     
    
            <Notification classname={shownotication.notifiacation} data={shownotication.data} type={shownotication.type}/> 

        </>
   : <h1>Data not found <button onClick={getapi}>Reload</button> </h1> }
 

     <span className="refresh" onClick={getapi}>REFESH LIST</span>
    </div>

    
)


}

export default memo(Cart);