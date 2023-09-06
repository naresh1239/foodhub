import React from 'react'
import { memo } from "react";
const Notification = ({data,classname,type}) => {
   console.log("natifi")
  return (
    <div className={ classname ?  'notification' : "hide"}>
     { type == 'cart' ?  <p>You have added this item in cart</p> : null}
     { type == 'favorite' ?  <p>You have Favorite this item</p> : null}
   
      <p>{data?.recipe?.label}</p>
      </div>
  )
  
}

export default memo(Notification)