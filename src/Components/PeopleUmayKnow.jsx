import React, { useEffect, useState } from 'react'
import Image from "../Components/Image"
import bigT3 from "../assets/bigT3.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const PeopleUmayKnow = () => {

  const db = getDatabase();

  let userInfo = useSelector((state)=>state.loggedUser.value)
  
  
  let [userList, setuserList] = useState([])
  
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
    let arr = []
    snapshot.forEach(item => {
      if (userInfo.uid != item.key) {
        
        arr.push({...item.val(),userId: item.key});
      }
    });

    setuserList(arr)
  
});
  },[])


  let SendRequestbtn = (info)=>{
    

    

    set(push(ref(db, 'connectRequest')), {
      whoSendName: userInfo.displayName,
      whoSendId: userInfo.uid,
      whoRecieveName: info.username,
      whoRecieveId: info.userId
    });
    
    
  
  }


  let [pendingList,setPendingList] = useState([])

  useEffect(()=>{

    const pendingRequestRef = ref(db, 'connectRequest');
    onValue(pendingRequestRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{

      
        
        arr.push(item.val().whoRecieveId + item.val().whoSendId);
      


    })
    setPendingList(arr)
    });

  },[])




  let [connectList,setconnectList] = useState([])

  useEffect(()=>{

    const pendingRequestRef = ref(db, 'connections');
    onValue(pendingRequestRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{

      
        
        arr.push(item.val().whoRecieveId + item.val().whoSendId);
      


    })
    setconnectList(arr)
    });

  },[])

  let handleCancel = ()=>{
    
  }





  return (
    <div className="PeopleYouMayKnow">

        <h3>People You May know</h3>

        {userList.map(item=>(

        <div className="peopleyoumayknowlist">
          <Image name="frndimg" src={bigT3}/>
            <h4>{item.username}</h4>
            {pendingList.includes(item.userId+userInfo.uid) || pendingList.includes(userInfo.uid+item.userId) 
            ? 
            <Button color='success' variant="contained">Pending</Button>
            
            // <Button color='success' variant="contained">Cancel</Button>
            : 
            connectList.includes(item.userId+userInfo.uid) || connectList.includes(userInfo.uid+item.userId) 
            ?
            <Button color='secondary' variant="contained">Friend</Button> 
            :
            <Button onClick={()=>SendRequestbtn(item)} variant="contained">Request</Button> 
            }

            {pendingList.includes(item.userId + userInfo.uid)  
            ? 
            <Button onClick={()=>handleCancel(item)} variant='contained'>Cancel</Button> 
            : null}
            
        </div>
        ))}

      </div>
  )
}

export default PeopleUmayKnow