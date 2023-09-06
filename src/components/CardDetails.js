import React,{useEffect,useState} from 'react'
import { Link, useParams } from 'react-router-dom'

const CardDetails = () => {
    const [DataList,setDataList] = useState([])
    const [loader,setLoader] = useState({starting : true , middle : true})
     const {cardID} = useParams()


    const getItemlist = async() =>{
        try {
          const jsonData = await fetch(`https://www.edamam.com/api/recipes/v2/${cardID}?type=public`);
          const data = await jsonData.json();
          setDataList(data)
          setLoader({starting : false , middle : false})
        } catch (error) {
          console.log(error)
        }
      
         }
  
     useEffect(()=>{
      getItemlist()
      },[])

  return (
    <div>  
         <div class="img-card iCard-style1 cardDatails">
                       
    <div class="card-content">
        <div class="card-image">
            {/* <span class="card-title">Cloud Beauty</span> */}
            {/* <span class="card-title">{card.recipe.mealType}</span> */}
          <img src={ DataList?.recipe?.image} alt="image"/>
         
        </div>
        
        <div class="card-text">
            <p>
            {DataList?.recipe?.label}
            </p>
            <p>dishType : <i>{DataList?.recipe?.dishType}</i></p>
<i>totalWeight : {DataList?.recipe?.totalWeight}</i>
<br/>
<i>mealType : {DataList?.recipe?.mealType}</i>
<i> {DataList?.recipe?.cuisineType}</i>


        </div>
        
    </div>
<div className='detailsOfMeals'>
<div className='left'>
  <h3>Ingredients:</h3>
  <div className='ingrediets'>
{DataList?.recipe?.ingredients.map((item,i)=>{
  return(
    <div className='ingrediet'>
      <h3 key={i}>Ingredients No {i+1}</h3>
    <p>Food - {item.food},</p>
   <p>Measure - {item.measure},</p>
   <p>Quantity - {item.quantity},</p>
   <p>{item.text}</p>
   <p>weight - {item.weight}</p>
    </div>
  )
})}
</div>
</div>
<div className='right'>

</div>
</div>
    <div class="card-link" >
        <Link to="/cart" title="Add To Cart"><span>🛒</span></Link>
        <Link to="/favirote" title="Add To Favorite"><span>❤️</span></Link>
        <a href={DataList?.recipe?.url} target='_blank' title="Read Full"><span>Read Full</span></a>
    </div>

</div>   
</div>
  )
}

export default CardDetails