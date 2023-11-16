import React, { useEffect, useState } from 'react'
import Image from './Image'
import { useSelector} from 'react-redux';
import { Card, CardContent, CardMedia, TextField } from '@mui/material';
import { getDatabase, ref, set, push, onValue, remove, update   } from "firebase/database";
import photo1 from "../assets/photo1.png"
import video from "../assets/video.png"
import event from "../assets/event.png"
import article from "../assets/article.png"
import Stevejobs from "../assets/Stevejobs.png"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdArrowDownward } from "react-icons/md"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};












const Centersection = () => {

  const db = getDatabase();

  let userinfo = useSelector((state)=> state.loggedUser.value)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  let [typevalue, settypevalue] = useState({

    Post: "",

  })


  let [postarray, setpostarray] = useState([])


  let [postid, setpostid] = useState("")



  let typingPost = (e)=>{
      
    settypevalue({
        
        [e.target.name]: e.target.value
      })

     
  }


  let handlePost = ()=>{
    
    set(push(ref(db, 'PostbyUser/')), {
      userPost: typevalue.Post,
      
    });

    setOpen(false)
  }


  useEffect(()=>{
    const PostRef = ref(db, 'PostbyUser/');
    onValue(PostRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{
      
      arr.push({...item.val() , id: item.key})
      
    })
    setpostarray(arr)
   
});
  },[])


  let PostDelete = (id)=>{
    remove(ref(db, "PostbyUser/" + id))
  }


  let postEditbtn = (item)=>{

    setOpen1(true)
      
    settypevalue({
        Post: "",
    })

    setpostid(item.id)


     
  }


  let postUpdatebtn = ()=>{

        update(ref(db, "PostbyUser/" + postid),{
        userPost: typevalue.Post,
      });

      setOpen1(false)
      
  }



  return (
    <div>
      <div className='inputpostdetail'>

        <Image name="postimg" src={userinfo.photoURL}/>
        
        <TextField onClick={handleOpen} style={{width:"750px"}} InputProps={{sx:{borderRadius:150}}}  variant='outlined' label="Whats on your mind ?"/>
        

        <div className='postIcon'>

          <div className='iconflex'>

        <Image name='srcimage' src={photo1}/>
        <p>Photo</p>
          </div>

          <div className='iconflex'>
        <Image name='srcimage' src={video}/>
        <p>Video</p>

          </div>

          <div className='iconflex'>

        <Image name='srcimage'  src={event}/>
        <p>Event</p>
          </div>

          <div className='iconflex'>
        <Image name='srcimage'  src={article}/>
        <p>Article</p>

          </div>

        </div>

        
      </div>

      
      
      {postarray.map(item=>(
          <div className='mediapostDiv'>

            <Card>
              <CardContent>
                <div className='newpostcontent'>

                    <Image name="newspostimage" src={userinfo.photoURL}/>

                  <div>

                    <h5>{userinfo.displayName}</h5>
                    
                    <p>Designation</p>

                  </div>

                </div>
                  <h5 className='thought'>Status <MdArrowDownward/> </h5>

                  <div className='postType'>

                  <p>{item.userPost}</p>

                  </div>

                  <div className='Postbutton'>

                  <Button className='Postbutton' onClick={()=>PostDelete(item.id)} color='error' variant="contained">Delete</Button>
                  
                  <Button  onClick={()=>postEditbtn(item)}  color='success' variant="contained">Edit</Button>
                  </div>

              </CardContent>


              {/* <CardMedia
              component="img"
              height={450}
              image={Stevejobs}>

              </CardMedia> */}
            </Card>



          </div>

      ))}

      






{postarray.map(item=>(
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>Share a thought</p>
             <TextField name='Post' onChange={typingPost} value={typevalue.Post}  style={{width:"400px"}} variant='outlined' label="Whats on your mind ?"/>
            
          </Typography>
          <br />

          <div>

          {/* <Button variant="contained">Edit</Button> */}

          <Button onClick={postUpdatebtn}  variant="contained">Update</Button>

          </div>
          
        </Box>
      </Modal>
      ))}

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>Share a thought</p>
             <TextField name='Post' onChange={typingPost}  style={{width:"400px"}} variant='outlined' label="Whats on your mind ?"/>
            
          </Typography>
          <br />
          <div>

          <Button onClick={handlePost} variant="contained">Post</Button>

          </div>
        </Box>
      </Modal>

    </div>
  )
}

export default Centersection