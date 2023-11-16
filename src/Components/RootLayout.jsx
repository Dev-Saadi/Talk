
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Home from '../Pages/Home';

const RootLayout = () => {

    




  return (
    <>

<Grid container spacing={2}>
  <Grid item xs={12}>
  <div>
    <Topbar/>
    <Outlet/>
    

    
  </div>
  </Grid>
  {/* <Grid item xs={0}>
  </Grid> */}
  
</Grid>



    
    
    </>
  )
}

export default RootLayout