import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FaNewspaper } from "react-icons/fa"
import { BsPersonCircle} from "react-icons/bs"
import {  BiMessageSquareDots } from "react-icons/bi"
import {  MdOutlineLogout } from "react-icons/md"
import {  CgProfile } from "react-icons/cg"
import {  IoIosPeople } from "react-icons/io"
import {  Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Grid from '@mui/material/Grid';
import bigT from "../assets/bigT.png"
import { PiMagnifyingGlassBold } from "react-icons/pi"
import { loggedUser } from "../Slices/userSlice";
import Image from './Image';



const Topbar = () => {


let userinfo = useSelector((state)=> state.loggedUser.value)

let navigate = useNavigate()

const dispatch = useDispatch()

const auth = getAuth();


let [url, seturl] = useState("home")





    let Logoutbtn = ()=>{

        signOut(auth).then(() => {
          dispatch(loggedUser(null))
          localStorage.removeItem('user')
          navigate("/login")
        
      })
        
        
        
       }




  return (

   
   <>

    <Grid className='navbartop' container>

        <Grid className='navlogo' item xs={6}>

            <div className='LogoDiv'>

                <div >

                <Image src={bigT} name="logo"/>
                </div>
                <p className='LogoName'>alk</p>

                <div>
                <PiMagnifyingGlassBold className='lensIcon' />

                </div>
            
            </div>

            
        </Grid>

        <Grid className='navicons' item xs={6}>

            <div className='NavIconDiv'>

            <div onClick={()=>seturl("home")} className={url == "home" && "active"} >

                <Link to="/home">

                <FaNewspaper  className='icon' />

                </Link>

                <p className='iconName'>Home</p>


            </div>

            </div>

            <div className='NavIconDiv'>

            <div onClick={()=>seturl("message")} className={url == "message" && "active"}>

                <Link to="/message">

                <BiMessageSquareDots className='icon' />

                </Link>

                <p className='iconName'>Message</p>


            </div>

            </div>


            <div className='NavIconDiv'>

            <div onClick={()=>seturl("connections")} className={url == "connections" && "active"}>

                <Link to="/connections">

                <IoIosPeople className='icon' />
                

                </Link>

                <p className='iconName'>Connections</p>

            </div>
            
            </div>




            <div className='NavIconDiv' >

                <Link to="/Profile">

                    <Image name="navbarimg" src={userinfo.photoURL}/>

                </Link>
                
                <p className='iconName'>{userinfo.displayName}</p>

                



                {/* <BsPersonCircle /> */}

            </div>


            <div className='NavIconDiv'>

                
                <MdOutlineLogout onClick={Logoutbtn}  className='icon'/>
                
                <p className='iconName' >Logout</p>



            </div>
        
        
        </Grid>

    </Grid>





   </>

    
    

    

    // <div className='topbar'>
    //     <div className='topbardiv'>
    //     <img className='topbarimg' src={userinfo.photoURL}/>
    //     <h1 className='usrnam'>{userinfo.displayName}</h1>

    //     </div>

        
    //     <div onClick={()=>seturl("home")} className={url == "home" && "active"}> 
    //         <Link to="/home"><FaNewspaper className='icon'/></Link>
    //     </div>

    //     <div onClick={()=>seturl("message")} className={url == "message" && "active"}> 
    //        <Link to="/message"><SiGooglemessages className='icon'/></Link> 
    //     </div>

    //     <div onClick={()=>seturl("notification")} className={url == "notification" && "active"}> 
    //     <Link to="/notification"><BsPersonVcard className='icon'/></Link> 
    //     </div>

    //     <div> 
    //     <CgProfile className='icon'/>
    //     </div>

    //     <div> 
    //         <MdOutlineLogout onClick={Logoutbtn}  className='icon'/>
    //     </div>
        


    // </div>



    
  )
}

export default Topbar
