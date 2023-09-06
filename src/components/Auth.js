import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { SET_USER,SET_LOGIN_USER } from '../store/Slice'
import { Link, useNavigate } from 'react-router-dom'


const Auth = () => {
    const [active, setactive] = useState(2)
    const [signup , setSignup ] = useState({
        email : '',
        firstName : '',
        lastName : '',
        password : '',
        passwordConfirmation : '',
        favorite : [],
        cart : [],

    })
    const [login , setLogin ] = useState({
        email : '',
        password : '',
    })

    const Navigate = useNavigate();
const dispatch = useDispatch()

    const userDatailsFn = (event) =>{
        const {name , value} = event.target;
        setSignup({...signup,[name] : value})
    }

    const Register = () =>{
        if(signup.email  && signup.firstName && signup.password){
            const users = localStorage.getItem('users') != null &&  JSON.parse(localStorage.getItem('users'))
           const userMailfound =   users?.length > 0 && users?.filter((user)=>{
                return user.email == signup.email
            })
            if(userMailfound.length > 0) {
             alert("email already in use")
            }else{
            if( signup.password === signup.passwordConfirmation){
                dispatch(SET_USER(signup))
              
                setSignup({
                    email : '',
                    firstName : '',
                    lastName : '',
                    password : '',
                    passwordConfirmation : '',
                    favorite : [],
                    cart : [],
            
                })
                Navigate('');
            } else{
                alert("Password and Confirm Password must be same")
            }
        }
        }else{
            alert("Please fill all the fields")
        }
  
     
    }
    const userLogin = (event) =>{
        const {name , value} = event.target;
        setLogin({...login,[name] : value})
    }

    const setuserlogin = () =>{
     
        const users = localStorage.getItem('users') != null &&  JSON.parse(localStorage.getItem('users'))
        const userMailfound = users?.length > 0 &&  users?.filter((user)=>{
            return user.email == login.email
        })
       
        if(userMailfound?.length > 0){
            const userfound = users?.length > 0 &&  users?.filter((user)=>{
                return user.email == login.email  && user.password == login.password
            })
          
            if(userfound?.length > 0){
             dispatch(SET_LOGIN_USER())
             Navigate("")
            }else{
                alert("Email or Password is incorrect, Please try again.")
            }
        }else{
            alert("user not found")
        }
      
      

    }

  
  return (

    <>
    <div className="wrapper">
	{/* <div className="btn-group" id="form-selector">
		<button type="button" className={`btn btn-selector ${active == 1 && 'active'}`} id="1" onClick={()=>setactive(1)}>Register</button>
		<button type="button" className={`btn btn-selector ${active == 2 && 'active'}`}  id="2" onClick={()=>setactive(2)}>Log In</button>
		
	</div> */}
    { active == 1 ?
	<div className="form activeform" id="1" >
		<h2 className="form-title">Register</h2>
        <label>Email</label>
		<input type="text" name='email' value={signup.email} className="input-std" id="email" placeholder="Email" onChange={userDatailsFn}/>
        <label>First Name</label>
        <input type="text" name='firstName' value={signup.firstName} className="input-half" id="first-name" placeholder="First Name" onChange={userDatailsFn}/>
        <label>Password</label>
        <input type="password" name='password' value={signup.password} className="input-std" id="password" placeholder="Password" onChange={userDatailsFn}/>
        <label>Password Confirmation</label>
        <input type="password" name='passwordConfirmation' value={signup.passwordConfirmation} className="input-std" id="password-confirmation" placeholder="Password Confirmation" onChange={userDatailsFn}/>
		{<button type="button" className="btn-submit" id="sign-up" onClick={Register}>Register!</button>}
        <span>Already have a account? <a href='#' onClick={()=>setactive(2)}>Log in</a></span>

	</div> 
    :
	<div className="form" id="2">
		<h2 className="form-title">Login</h2>
        <label>Email</label>
		<input type="text" name='email' value={login.email} className="input-std" id="email" placeholder="Email" onChange={userLogin}/>
        <label>Password</label>
		<input type="password" name='password' value={login.password} className="input-std" id="password" placeholder="Password" onChange={userLogin}/>
		<button type="button" onClick={setuserlogin} className="btn-submit" id="log-in" >Log In!</button>
        <span>Don't have a account? <a href='#' onClick={()=>setactive(1)}>signup</a></span>
	</div>
    
}
</div>

    </>

    
  )
}

export default Auth