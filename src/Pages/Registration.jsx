import Image from "../Components/Image"
import bigT from "../assets/bigT.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { PiEyeClosed } from 'react-icons/pi'
import { FaRegEye } from 'react-icons/fa'
import { ColorRing } from  'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Registration = () => {

  const db = getDatabase();


  const auth = getAuth();

  let navigate = useNavigate()

  let [formdata, setformdata] = useState({
    fullname:"",
    email:"",
    password:""
  })

  // let [errordata, seterrordata] = useState("");

  let [fullnamerror,setfullnameerror] = useState("")

  let [emailerror,setemailerror] = useState("")

  let [passworderror,setpassworderror] = useState("")

  let [eyeopen, seteyeOpen] = useState(false)

  let [load, setload] = useState(false)

  let inputfieldchange = (e)=>{
    setformdata({
      ...formdata,
      [e.target.name]:e.target.value
    })

    if (e.target.name == "fullname") {
      setfullnameerror("")
  }
  if (e.target.name == "email") {
      setemailerror("")
  }
  if (e.target.name == "password") {
      setpassworderror("")
  }


  }


 let registrationbtn = ()=>{
  console.log(formdata);

  if (!formdata.fullname) {
    setfullnameerror("Full name required")
  }
  if (!formdata.email) {
    setemailerror("Email required")
  }
  if (!formdata.password) {
    setpassworderror("password required")
  }
  if (formdata.fullname && formdata.email && formdata.password) {
            
    // let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // let passwordExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // if (!pattern.test(formdata.email)) {
    //     setemailerror("Invalid Email")
    // }
    // if (formdata.fullname.length < 3) {
    //     setfullnameerror("Full name must more than 3 characters")
    // }
    // if(!passwordExpression.test(formdata.password)){
    //     setpassworderror("password not strong")
    // }

    setload(true)

    

    createUserWithEmailAndPassword(auth, formdata.email, formdata.password).then((user)=>{


      updateProfile(auth.currentUser, {
        displayName: formdata.fullname, 
        photoURL: "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-e51c6.appspot.com/o/Avatar.jpg?alt=media&token=eb95b6ce-cb6b-4ef9-816a-0b0526551e8d"
      }).then(()=>{

        sendEmailVerification(auth.currentUser).then(()=>{
  
  
          setformdata({
            fullname:"",
            email:"",
            password:""
          })
    
          setload(false)
    
          toast.success('👍 Registraion Successfull! Please verify with your email.', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
  
  
            setTimeout(() => {
              navigate("/login")
            }, 1000);
        
  
  
  
  
        }).then(()=>{
          

          set(ref(db, 'users/' + user.user.uid), {
            username: formdata.fullname,
            email: formdata.email,
            profile_picture : "https://firebasestorage.googleapis.com/v0/b/linkedin-clone-e51c6.appspot.com/o/Avatar.jpg?alt=media&token=eb95b6ce-cb6b-4ef9-816a-0b0526551e8d"
          });

        })
      })




     

    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    if (errorCode.includes("email")) {

      setemailerror("Email already resgistered.")

      // toast.error('✋ Email already resgistered.', {
      //   position: "bottom-center",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   });

      
    }

    setload(false)

    


  });

  }

}




  return (
    <div className="bgcolor">

    <div className="regImage">
        <Image src={bigT}/>
    </div>

    <div className="Headline">
        <h2>Register and start Talking.</h2>
        <p>Talk with people from around the world with Free Registration.</p>

    <div className="textfield1">

    <TextField onChange={inputfieldchange} name="fullname"   sx={{ input: { color: 'white' } }} color="warning" type="text" className="inputcss" id="outlined-basic" label="Full Name" variant="outlined" value={formdata.fullname}  />

    {fullnamerror && <Alert className='alert' severity="error">{fullnamerror}</Alert>}

    </div>
    <div className="textfield1">

    <TextField onChange={inputfieldchange} name="email" sx={{ input: { color: 'white' } }} color="warning" type="email" className="inputcss" id="outlined-basic" label="Email" variant="outlined" value={formdata.email}  />

    

    {emailerror && <Alert className='alert' severity="error">{emailerror}</Alert>}

    </div>
    <div className="textfield1">

    <TextField onChange={inputfieldchange} name="password" sx={{ input: { color: 'white' } }} color="warning" type={eyeopen ? "text" : "password"} className="inputcss" id="outlined-basic" label="Password" variant="outlined" value={formdata.password}  />

    {eyeopen 

    ?

    <FaRegEye onClick={()=>seteyeOpen(false)} className="eye" />

     :
     
     <PiEyeClosed onClick={()=>seteyeOpen(true)} className="eye" />
     }



    {passworderror && <Alert className='alert' severity="error">{passworderror}</Alert>}

    </div>

    <div>

      {load 

      ?

      <Button className="signupbtn" variant="contained" disabled>

            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['hsl(0, 0%, 37%)', 'hsl(0, 0%, 12%)', 'hsl(0, 0%, 100%)', 'hsl(0, 0%, 90%)', '#C41E3A']}
            />
            
        </Button>

      :
      
    <Button onClick={registrationbtn}  className="signupbtn" variant="contained">Sign Up</Button> 
      }



    </div>

    <div>
      <p>Already have an account ? <Link className="focus" to="/login">Log In</Link></p>
    </div>



    </div>


    </div>
  )
}

export default Registration