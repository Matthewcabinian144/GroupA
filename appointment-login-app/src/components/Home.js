/**
 * The home program displays the homepage which the user sees after they log in
 * 
 * @author Ian Tjahjono
 */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import BookingPage from './BookingPage';

function Home() {

    const [name, setName] = useState();
    const location = useLocation();

    //To retrieve name of user from Singpass API and store into database for future use
    useEffect(() => {
        // axios.post('http://localhost:5000/login/user', {
        axios.post('/login/user', {
            nric: location.state.nric
        }).then(res => {
            setName(res.data[0].name);
        }).catch(error => {
            console.log(error.response)
            alert(JSON.stringify(error.response.data));
        });
    })

    return (
        <Card>
            <BookingPage name={name} nric={location.state.nric}></BookingPage>
        </Card>


    )
}

export default Home;