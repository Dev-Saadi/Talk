import React, { useEffect } from 'react'
import Image from "../Components/Image"
import bigT3 from "../assets/bigT3.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { useState } from 'react';



const PendingList = () => {


  const db = getDatabase();

  let userInfo = useSelector((state)=>state.loggedUser.value)

  let [pendingList,setPendingList] = useState([])

  useEffect(()=>{

    const pendingRequestRef = ref(db, 'connectRequest');
    onValue(pendingRequestRef, (snapshot) => {
      let arr = []
    snapshot.forEach(item=>{

      if (item.val().whoRecieveId == userInfo.uid) {
        
        arr.push({...item.val(), connectId: item.key});
      }


    })
    setPendingList(arr)
    });

  },[])

  let deleteRequestbtn = (item)=>{
    
    remove(ref(db,'connectRequest/'+ item.connectId))
  }


  let acceptRequestbtn = (item)=>{
    set(push(ref(db, 'connections/')), {
      ...item
    }).then(()=>{
      remove(ref(db,'connectRequest/'+ item.connectId))
    })
  }








  return (
    <div className="Pending">

        <h3>Pending</h3>

        {pendingList.map(item=>(

        <div className="pendinglist">
        <Image name="frndimg" src={bigT3}/>
        <h4>{item.whoSendName}</h4>

        <Button onClick={()=>acceptRequestbtn(item)} variant="contained">Accept</Button>

        <Button onClick={()=>deleteRequestbtn(item)} color='error' variant="contained">Delete</Button>

        <Button color='success' variant="contained">Block</Button>

        </div>
        
        ))}

      </div>
  )
}

export default PendingList