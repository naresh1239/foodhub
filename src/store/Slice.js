import { createSlice } from '@reduxjs/toolkit'

const Favirote_item = localStorage.getItem('favorite')?.length > 0 ? JSON?.parse(localStorage.getItem('favorite')) : [];
const Cart_item = localStorage.getItem('cart')?.length > 0 ? JSON?.parse(localStorage.getItem('cart')) : [];
const users = localStorage.getItem('users')?.length > 0 ? JSON?.parse(localStorage.getItem('users')) : []
const userActive = localStorage.getItem('useractive')?.length > 0 ? JSON?.parse(localStorage.getItem('useractive')) : false
const initialState = {
  cart : Cart_item,
  AllCartList : [],
  list : [],
  refresh : false,
  Favorite : Favirote_item,
  theme : localStorage.getItem('theme') || 'light',
  next : '',
  users : users,
  userActive : userActive,
  Loader : true
}

export const Slice = createSlice({
  name: 'counter',
  initialState : initialState,
  reducers: {
    SET_FILTER_SEARCH_DATA: (state,payload) => {
    state.AllCartList = payload.payload.hits
    
    },
    GET_ALL_LIST : (state,payload) =>{
  
      if(payload?.payload?.action == "refetch"){
        console.log('refetch')
        state.AllCartList = []
      }else{
        console.log('scroll')

     state.AllCartList.push(...payload.payload.payload)
      }
   
    
      
       state.list = payload.payload
    },
    GET_filter_LIST : (state,payload) =>{

      // state.AllCartList = payload.payload 
   },
    REFRESH: (state, payload) => {
      state.refresh = payload.payload
    },
    ADD_TO_CART: (state,payload) => {
      state.cart.push(payload.payload)
      localStorage.setItem('cart',JSON.stringify( state.cart));
    },
    REMOVE_TO_CART: (state,payload) => {
    
      state.cart.splice(payload.payload,1)
      localStorage.setItem('cart',JSON.stringify( state.cart));
    },
    ADD_TO_FAVORITE: (state, payload) => {
            state.Favorite.push(payload.payload)
      localStorage.setItem('favorite',JSON.stringify( state.Favorite));
   
    },
    REMOVE_TO_FAVORITE: (state, payload) => {

      state.Favorite.splice(payload.payload,1)
      localStorage.setItem('favorite',JSON.stringify( state.Favorite));

},
    SET_THEME : (state,payload) =>{
      state.theme = payload.payload
      localStorage.getItem(payload.payload) 
    },
    RESET_DATA_LIST : (state,payload) =>{
      state.AllCartList = payload.payload.hits

    },
    NEXT_PAGE : (state,payload) =>{

      state.next = payload.payload

    },
    SET_USER : (state,payload) =>{
      state.users = payload.payload
      state.userActive = true
      localStorage.setItem('users',JSON.stringify([...users,payload.payload]));
      localStorage.setItem('useractive',true);
    },
    SET_LOGIN_USER : (state,payload)=>{
      state.userActive = true
      localStorage.setItem('useractive',true);
    },
    LOGOUT_USER : (state,payload) =>{
      state.userActive = false
      state.Favorite = []
      state.cart = []
      localStorage.setItem('useractive',false);
      localStorage.setItem('favorite',[]);
      localStorage.setItem('cart',[]);
    },
    LOADER : (state,payload)=>{
     state.Loader = payload.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {LOADER,SET_LOGIN_USER,LOGOUT_USER,SET_USER,RESET_DATA_LIST, ADD_TO_CART,REMOVE_TO_CART, REMOVE_TO_FAVORITE, GET_ALL_LIST,GET_filter_LIST,REFRESH,SET_FILTER_SEARCH_DATA,ADD_TO_FAVORITE,SET_THEME,NEXT_PAGE } = Slice.actions

export default Slice.reducer