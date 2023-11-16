import Image from "../Components/Image"
import bigT from "../assets/bigT.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { PiEyeClosed } from 'react-icons/pi'
import { FaRegEye } from 'react-icons/fa'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ColorRing } from  'react-loader-spinner'
import { loggedUser } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";



const Login = () => {

  const auth = getAuth();

  const dispatch = useDispatch()

 

  let navigate = useNavigate()

  

  
  let [open,setOpen] = useState(false)

  let [emailerror,setemailerror] = useState("")

  let [passworderror,setpassworderror] = useState("")

  let [load,setload] = useState(false)



  const data = useSelector(state=> state.loggedUser.value)


  useEffect(()=>{
    if (data) {
      navigate("/home")
    }
  },[])



  let [logindata,setlogindata] = useState({

    email: "",
    password:"",

  })




  let inputTypelogin = (e)=>{
    setlogindata({
      ...logindata,
      [e.target.name]: e.target.value
    })


    if (e.target.name == "email") {
      setemailerror("")
    }

    if (e.target.name == "password") {
      setpassworderror("")
    }


  }

  let Loginbtn = ()=>{

    if (!logindata.email) {
      setemailerror("Email required")
    }
    if (!logindata.password) {
      setpassworderror("Password required")
    }

    if (logindata.email && logindata.password){

      setload(true)

      signInWithEmailAndPassword(auth, logindata.email, logindata.password).then((user)=>{

        // console.log(user);

        // if (user.user.emailVerified) {
          navigate("/home")
          dispatch(loggedUser(user.user))
          localStorage.setItem("user",JSON.stringify(user.user))
        // }
        
        // else{

        //   toast.error('🧐 Please verify your email', {
        //     position: "bottom-left",
        //     autoClose: 2000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        // });

          

        // }
        setload(false)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (!errorCode.includes("email")) {

          setemailerror("Email does not exist")


          // toast.error('😕 Email does not exist', {
          //     position: "bottom-left",
          //     autoClose: 2000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //     theme: "light",
          // });
      }
      setload(false)
      });





    }

  }

  // let [loginerror,setloginerror] = useState({

  //   emailerror:"email required",
  //   passworderror:"password required",

  // })



















  return (
    <div className="bgcolor">

    <div className="regImage">
        <Image src={bigT}/>
    </div>

    <div className="Headline">
        <h2>Login to your account!</h2>
        

    
    <div className="textfield1">

    <TextField onChange={inputTypelogin} name="email" sx={{ input: { color: 'white' } }} color="warning" type="email" className="inputcss" id="outlined-basic" label="Email" variant="outlined" />

    {emailerror && <Alert className='alert' severity="error">{emailerror}</Alert>}

    </div>
    <div className="textfield1">

    <TextField onChange={inputTypelogin} name="password" sx={{ input: { color: 'white' } }} color="warning" type={open ? "text" : "password"} className="inputcss" id="outlined-basic" label="Password" variant="outlined" />

    {open 
                ? 
                <FaRegEye onClick={()=>setOpen(false)} className='eye2'/>

                :
                <PiEyeClosed onClick={()=>setOpen(true)} className='eye2'/>

                }

    {passworderror && <Alert className='alert' severity="error">{passworderror}</Alert>}

    </div>

    <div>

      {load 

      ? 

      <Button  className="signupbtn" variant="contained">
        <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['hsl(0, 0%, 37%)', 
              'hsl(0, 0%, 12%)', 
              'hsl(0, 0%, 100%)', 
              'hsl(0, 0%, 90%)', 
              '#C41E3A']}
            />
            
        </Button>

      




      :
      
    <Button onClick={Loginbtn}  className="signupbtn" variant="contained">Log In</Button>
      }





    </div>

    <div className="actionbtn">
      <p>Dont have an account ? <Link className="focus" to="/">Sign Up</Link></p>
    </div>



    </div>


    </div>
  )
}

export default Login