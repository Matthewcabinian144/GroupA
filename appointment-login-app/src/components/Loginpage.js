import { CardDeck } from "react-bootstrap";
import Announcements from "./Announcements";
import Login from "./Login";

function Loginpage() {
    return (
       <CardDeck className="carddeck">
           <Announcements></Announcements>
           <Login></Login>
       </CardDeck>
    )
}

export default Loginpage;