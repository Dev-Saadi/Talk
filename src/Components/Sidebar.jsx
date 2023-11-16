import Image from "./Image"
import coverimg from "../assets/coverimg.jpg"
import Avatar from "../assets/Avatar.jpg"
import { useSelector} from 'react-redux';

const Sidebar = () => {


  let userinfo = useSelector((state)=> state.loggedUser.value)






  return (
    <div className="coverimgdiv">
        <Image name="coverimg" src={coverimg}/>

        <div className="detailheader">
        <Image name="topbarimg" src={userinfo.photoURL}/>
        <h3>{userinfo.displayName}</h3>

        <h4>Designation</h4>
        </div>
        <div className="detail">
            <h5>Connections</h5>
            <h5>Invitations</h5>
        </div>

    </div>
  )
}

export default Sidebar