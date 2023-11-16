import  { useEffect } from 'react'
import Button from '@mui/material/Button';
import {  useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import Grid from '@mui/material/Grid';
import { loggedUser } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from '../Components/Sidebar';
import Rightsection from '../Components/Rightsection';
import Centersection from '../Components/Centersection';


const Home = () => {

  let navigate = useNavigate()

  const dispatch = useDispatch()

  const auth = getAuth();

  const data = useSelector(state=> state.loggedUser.value)


  useEffect(()=>{
    if (!data) {
      navigate("/login")
      
    }
  },[])







  return (

    <>

    <Grid className='CenterSection' container spacing={0}>

      <Grid item xs={3}>

        <Sidebar/>

      </Grid>

      <Grid item xs={6}>

        <Centersection/>

      </Grid>

      <Grid item xs={3}>

        <Rightsection/>


      </Grid>

    </Grid>
    
    </>
    

  //   <Grid container spacing={2}>
  //   <Grid item xs={4}>
    
  //   </Grid>
  //   <Grid item xs={4}>
  //   afasfafa
  //   </Grid>
  //   <Grid item xs={4}>
  //   afasfas
  //   </Grid>
    
  // </Grid>
    
  )

  
}

export default Home