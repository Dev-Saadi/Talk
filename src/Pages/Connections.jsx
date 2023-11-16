
import ConnectionsList from "../Components/ConnectionsList"
import PendingList from "../Components/PendingList"
import PeopleUmayKnow from "../Components/PeopleUmayKnow"

const Connections = () => {
  return (
    <div className="ConnectionsPage">

      <ConnectionsList/>

      <PendingList/>

      <PeopleUmayKnow/>
      

      

      

    </div>
  )
}

export default Connections