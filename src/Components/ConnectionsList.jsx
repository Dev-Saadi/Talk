import React from 'react'
import Image from "../Components/Image"
import bigT3 from "../assets/bigT3.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';

const ConnectionsList = () => {

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
















  let [pendingList,setPendingList] = useState([])

  useEffect(()=>{

    const connectionRequestRef = ref(db, 'connections');
    onValue(connectionRequestRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{

      
        
        arr.push({...item.val(), connectRequestId: item.key});
      


    })
    setPendingList(arr)
    });

  },[])



  let deleteConnectionbtn = (item)=>{
    console.log(item);
    remove(ref(db,'connections/'+ item.connectRequestId))
  }






  return (
    <div className="Friends">

        <h3>Connections</h3>

        {pendingList.map(item=>(

        <div className="friendlist">
        <Image name="frndimg" src={bigT3}/>
        <h4>{item.whoSendId == userInfo.uid ? item.whoRecieveName : item.whoSendName}</h4>
        <Button onClick={()=>deleteConnectionbtn(item)} color='error' variant="contained">Delete</Button>
        <Button color='success' variant="contained">Block</Button>

        </div>
        ))}

        
       

        

      </div>
  )
}

export default ConnectionsList