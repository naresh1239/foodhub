import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LOGO from "./Food_Network_logo.png"
import { FaHome, FaHeart, FaSearch,FaShoppingCart,FaUserAlt,FaMicrophone } from 'react-icons/fa';
import { NavLink} from "react-router-dom";
import { REFRESH,SET_FILTER_SEARCH_DATA,SET_THEME,RESET_DATA_LIST, NEXT_PAGE,LOGOUT_USER, LOADER} from "../store/Slice"
import {getItemlist,selectedCategoery} from "./API"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const Navbar = ({changecatf,filteredData}) => {
  const [searchInput, setSearchInput] = useState('')
  const [tempSearchInput, setTempSearchInput] = useState('')
  const [ShowMic, setShowMic] = useState(false)
  const [micInput, setMicinput] = useState('')
  const [basicStyle, setbasicStyle] = useState({sidenav : false})
  const [searchFilter, setsearchFilter] = useState({from : '',to : ''})
  const cart = useSelector((state) => state.slice.cart)
  const FavoriteCat = useSelector((state)=>state.slice.Favorite)
  const userActive = useSelector((state) => state.slice.userActive)
  const [searchSuggetions , setSearchSuggetions] = useState([])
  const dispatch = useDispatch()
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

const findSuggesting = async() =>{
  try {
    if(searchInput.length > 0){
    const getSuggestionData = await fetch(`https://www.edamam.com/auto-complete?q=${searchInput}&limit=10`)
    const data = await getSuggestionData.json()
    setSearchSuggetions(data)
    }
  } catch (error) {
    console.log(error)
  }


}

  useEffect(() => {
   const suggestingapi =  setTimeout(() => {
      findSuggesting() 
    }, 200);  
 
    return ()=>{
      clearTimeout(suggestingapi)
    }
    
  }, [tempSearchInput])
  

  const inputChange = (e) =>{
    if(e.target.name == 'search'){
      setSearchInput(e.target.value)
      setTempSearchInput(e.target.value)
    }
  else{
    setsearchFilter({...searchFilter,[e.target.name] : e.target.value})
  }
    // const filterdata = dataList.flat(Infinity).filter((data)=>   data.recipe.label.toUpperCase().includes(e.target.value.toUpperCase()))
    // setstoreSetData(filterdata)
  }
  
  useEffect(() => {
    if(transcript && listening == false){
      setShowMic(false)
      findSuggesting()
    }
    setMicinput(transcript)
    setSearchInput(transcript)
    }, [transcript,listening])
    
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }



 const runSpeechRecog = () => {
  setMicinput("")
  setShowMic(true)
  SpeechRecognition.startListening()
 }



  const Find_filter_DATA = async() =>{

      try {
        let url = ''
        if(searchFilter.from && searchFilter.to){
           url = 
          `https://www.edamam.com/api/recipes/v2?type=public&q=&calories=${searchFilter.from}-${searchFilter.to}`
        }else if(searchInput){
           url = 
          `https://www.edamam.com/api/recipes/v2?type=public&q=${searchInput}`
        }else if(searchFilter.from && searchFilter.to && searchInput){
          url = `https://www.edamam.com/api/recipes/v2?type=public&q=${searchInput}&calories=${searchFilter.from}-${searchFilter.to}`
        }else{
          alert("please inter somting to search")
          url = null
        }
          if(url !== null){
            try {
              dispatch(LOADER(true))
              const jsonData = await fetch(url);
              const data = await jsonData.json();
             dispatch(SET_FILTER_SEARCH_DATA(data))
             dispatch(LOADER(false))
             dispatch(NEXT_PAGE(data?._links?.next?.href == undefined ?  null : data?._links?.next?.href))
        
            } catch (error) {
              console.log(error)
            }
          
          }

      } catch (error) {
        console.log(error)
      }
  }


  const getapi = async() =>{
    dispatch(LOADER(true))
  const data = await  getItemlist();
  if(data){ dispatch(RESET_DATA_LIST(data)) 
     dispatch(NEXT_PAGE(data?._links?.next?.href))}
     dispatch(LOADER(false))
  }



  return (
    <div className="navbar-main">
    <div className="navbar">
      <div className="icon">


        {" "}
        <NavLink className="logo" to="" onClick={getapi}><img src={LOGO} alt="logo"></img></NavLink> 
        {/* <Link className="logo" to="/" ><img src={LOGO} alt="logo"></img></Link>  */}

      </div>{" "}
      <div className="sub-list">
     {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p> */}
    
      </div>
      <div className="search">
      <div className="serchbar">
        <input name="search"  value={searchInput} placeholder="search..." onChange={inputChange} onClick={inputChange}></input>
        {searchInput ?  <span style={{cursor : 'pointer',paddingRight : '5px'}} onClick={()=>{ setSearchInput('')}} >x</span> : ""}
        {<span style={{cursor : 'pointer'}} onClick={()=>{Find_filter_DATA()
           setSearchSuggetions([])}} >      <FaSearch /> </span>}
     
       {searchSuggetions?.length > 0 && searchInput.length > 0 ? <div className="suggestion">
        <div className="closeSuggestion" onClick={()=>setSearchSuggetions([])}>x</div>
          <ul>
            {
              searchSuggetions?.map((item)=>{
                return(
                  <li className="searchSuggetionsList" onClick={()=>{
                    setSearchSuggetions([])
                     setSearchInput(item)}}>{item}</li>
                )
              })
            }
           
          </ul>
        </div>
  : null }
      </div>
 <FaMicrophone onClick={runSpeechRecog} style={{cursor : "pointer"}}/>
</div>

      <div className="emoji">
      <NavLink to="" title="Recipes"><FaHome /><span>Recipes</span></NavLink>

      <NavLink to="favirote" title="Add To Favorite"><FaHeart/><span> Favorite<sup>{FavoriteCat?.length}</sup></span></NavLink>
     <NavLink to="cart" title="Add To Cart"><FaShoppingCart/><span> Cart <sup>{cart?.length}</sup></span></NavLink>
     <a href="https://naresh1239.github.io/newgitreactapp/" target="_blank">About</a>
     {userActive ? <a onClick={()=>dispatch(LOGOUT_USER())}> <span style={{cursor : "pointer"}}>Logout</span></a>  : <NavLink to="auth" title="login"><FaUserAlt/><span> login </span></NavLink> } 

      </div>

  {ShowMic ? <div className="micPopup" onBlur={()=>{setShowMic(false)
    setMicinput('')}}>
    <span className="crossbtn" onClick={()=>{setShowMic(false)
      setMicinput('')}}>X</span>
    <div className="main">
    <p>{micInput}</p>
    <FaMicrophone/>
      </div>
    <button onClick={()=>{setSearchInput(micInput)
      Find_filter_DATA() 
      setShowMic(false)
       setMicinput('')
       setSearchSuggetions([])}}>search</button>
  </div> : null}
    </div>
   
    </div>
  );
};

export default Navbar;
