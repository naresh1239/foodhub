import React,{useEffect,useState} from 'react'

import Navbar from './components/Navbar'

import { store } from './store/Store'
import { Outlet } from "react-router-dom";
import { Provider, useSelector } from 'react-redux'



const App = () => {
  return (
<Provider store={store}>

<Navbar />
<div className='body'>
<Outlet/>
{/* <Fotter/>  */}
</div>
</Provider>
  )
}


export default App