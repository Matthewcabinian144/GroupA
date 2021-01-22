/**
 * The home program displays the homepage which the user sees after they log in
 * 
 * @author Ian Tjahjono
 */

import axios from 'axios';
import { useEffect, useState } from 'react';

function Home(props) {

    const [name, setName] = useState();
    const [nric, setNRIC] = useState();

    // useEffect(() => {
    //     axios.post('http://localhost:5000/login/user', {
    //         nric: nric
    //     }).then(res => {
    //         console.log(res.data[0].name);
    //         setName(res.data[0].name);
    //     }).catch(error => {
    //         console.log(error.response)
    //         alert(JSON.stringify(error.response.data));
    //     });
    // }, [nric])

    return (
        <h1>Welcome {this.props.location}!</h1>


    )
}

export default Home;