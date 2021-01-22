/**
 * The Login program implements a webpage that allows the user to login in order to book an appointment
 * 
 * @author Ian Tjahjono
 */

import { useState } from 'react';
import axios from 'axios';
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Home from './Home';
import { Redirect, withRouter } from 'react-router-dom';

function Login() {

    const [nric, setNRIC] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState('false');

    const formSubmit = (event) => {
        event.preventDefault();
        console.log(event);
        console.log("NRIC: ", nric);
        console.log("Password: ", password);
        axios.post('http://localhost:5000/login', {
            nric: nric,
            password: password
        }).then(res => {
            console.log("Login successful!");
            setSubmitted(true);
        }).catch(error => {
            console.log(error.response);
            if (error.response.status === 404)
                alert("User not found!");
            if (error.response.status === 401)
                alert("Incorrect Password!");
        });
    }

    if (submitted === true) {
        console.log(nric);
        return <Redirect to={{
            pathname: "/home",
            state: { nric: nric }
        }}></Redirect>
    }

    return (
        <Card className="cardLogin">
            <h2>Login</h2>
            <Form onSubmit={(event) => formSubmit(event)}>
                <Form.Group controlId="nric" className="text-align-left">
                    <Form.Control type="text" value={nric} placeholder="Singpass ID"
                        onChange={e => setNRIC(e.target.value)} required />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Control type="password" value={password} placeholder="Password"
                        onChange={e => setPassword(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </Card>
    )
}

export default withRouter(Login);