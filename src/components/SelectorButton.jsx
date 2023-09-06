import React, { useState ,useEffect} from 'react'
import { getItemlist } from './API'
import { useDispatch, useSelector } from 'react-redux'
import { NEXT_PAGE,RESET_DATA_LIST,LOADER } from '../store/Slice'


const SelectorButton = () => {
    const [selectedcat, setSelectedcat] = useState('')
    const cartData = useSelector((state) => state.slice.AllCartList)
    const dispatch = useDispatch()
    const changeCat = async(selectedCategoery) =>{
      dispatch(LOADER(true))
        const url = `https://www.edamam.com/api/recipes/v2?${selectedCategoery}&type=public`
        const data = await  getItemlist(url);
        
        if(data){ dispatch(RESET_DATA_LIST(data)) 
           dispatch(NEXT_PAGE(data?._links?.next?.href))}
           dispatch(LOADER(false))
        }

useEffect(() => {

  setSelectedcat(cartData?.[0]?.recipe)
}, [cartData])


  return (

    <div className='second-navbar'>
        <ul>
            <li  className={selectedcat == 'Vegetarian' ? "active" : ""} onClick={()=>changeCat("health=vegetarian")}>vegetarian</li>
            <li  className={selectedcat == 'Alcohol-Free' ? "active" : ""} onClick={()=>changeCat("health=alcohol-free")}>alcohol-free</li>
            <li  className={selectedcat == 'Vegan' ? "active" : ""} onClick={()=>changeCat("health=vegan")}>vegan</li>
            <li  className={selectedcat == 'Sugar-Conscious' ? "active" : ""} onClick={()=>changeCat("health=sugar-conscious")}>sugar-conscious</li>
            <li  className={selectedcat == 'Low-Fat' ? "active" : ""} onClick={()=>changeCat("diet=low-fat")}>low-fat</li>
            <li  className={selectedcat == 'Low-Sodium' ? "active" : ""} onClick={()=>changeCat("diet=low-sodium")}>low-sodium</li>
            <li  className={selectedcat == 'Balanced' ? "active" : ""} onClick={()=>changeCat("diet=balanced")}>balanced</li>
            <li  className={selectedcat == 'High-Protein' ? "active" : ""} onClick={()=>changeCat("diet=high-protein")}>High-Protein</li>
            <li  className={selectedcat == 'High-Fiber' ? "active" : ""} onClick={()=>changeCat("diet=high-fiber")}>high-fiber</li>
        </ul>
        <div className='results'>
 <p>Recipe containing   &nbsp;&nbsp;&nbsp;{ selectedcat?.healthLabels?.join(" , ")}</p>
        </div>
    </div>
  )
}

export default SelectorButton