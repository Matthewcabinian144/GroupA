/**
 * This program renders the login page that the user first sees when they enter the site
 * 
 * @author Ian Tjahjono
 */

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