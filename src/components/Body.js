import React,{memo, useEffect,useState} from 'react'
import Navbar from './Navbar'
import Cart from './Cart'
import {getItemlist} from "./API"
import Simmer from "./Simmer"
import { useDispatch,useSelector } from 'react-redux'
import {GET_ALL_LIST,NEXT_PAGE,LOADER} from "../store/Slice"
import SelectorButton from './SelectorButton'
import Carousal from './Carousal'
import Cardslide from './Cardslide'

const Body = () => {
  const [scrollBefore,setScrollBefore] = useState(0)
  const [Data, setData] = useState([])
  const [DataList,setDataList] = useState([])
  const [changeCAT, setCahngeCAT] = useState('balanced')
  const [FilterDataValue , setFilterDataValue] = useState([])
  const [loader,setLoader] = useState({starting : true , middle : true})
 const [nextURL , setNextURL] = useState('')
  const dispatch = useDispatch()
  const theme = useSelector((state)=>state.slice.theme)
  const next = useSelector((state)=>state.slice.next)


  const getData = async(url) =>{
    try {
      const data = await getItemlist(url); // Using await to get the resolved data

         if(data?.hits?.length > 0){
          setData(data)
          setDataList((pev)=> [...pev,...data?.hits])
          setFilterDataValue((pev)=> [...pev,...data?.hits])
           dispatch(GET_ALL_LIST({action : "scroll", payload : data.hits}))
          setLoader({starting : false , middle : false})
         dispatch(NEXT_PAGE(data?._links?.next?.href))
           dispatch(LOADER(false))

       
        }else{
          dispatch(LOADER(false));
        }
         
        //  setNextURL(data._links.next.href)
        
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  

  

  
  console.log('body')

      const scrolling = () =>{

          if(scrollBefore <  window.scrollY){
   
              if(window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight){
                 
              if(loader.middle == false ){

              getData(next)

              setScrollBefore(window.innerHeight+ window.scrollY+1500 )
              }
             setLoader({starting : false , middle : true})
              }else{
                  setScrollBefore(window.scrollY)
              }
          }else{
            setScrollBefore(window.scrollY)
          }
      }

      useEffect(()=>{
     
      window.addEventListener('scroll' ,scrolling)
    return ()=>  window.removeEventListener('scroll', scrolling)
      },[Data,scrollBefore])

 
      useEffect( ()=>{
        dispatch(GET_ALL_LIST({action : "refetch", payload : []}))
       getData()
       },[])
   
    return (
  
    <>
  <Carousal/>
  <SelectorButton/>
   <Cardslide/>
 
        { loader.starting ?  <div className='cardBody'>{Array(20).fill("").map((e,i)=><Simmer key={i}/>) }</div>   :    <Cart/>
     }
     
    </>
  )
}

export default memo(Body)