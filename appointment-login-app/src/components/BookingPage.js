/**
 * This page allows users to book appointment. An alert will pop upon successful booking (it comes from the api-backend)
 * Users would be able to see their booking in the view booking page as well 
 * 
 * @author Surya Lekha
 */

//importing the various components to be used in the form
import { Button, Tab, Tabs, Table, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

//useEffect accepts function 
function BookingPage(props) {
    const history = useHistory();
    const [booking, setBooking] = useState([]);
    const [click, setClick] = useState(0);

    useEffect(() => {
        // for sucessful request (get method to view booking)
        // Update the document title using the browser API
        // axios.post('http://localhost:5000/login/home', {
        axios.post('/login/home', {
            nric: props.nric
        }).then(res => {
            setBooking(res.data);
            //for unsucessful request 
        }).catch(error => {
            console.log(error.response)
        });
    }, [click]);

    //const function to declare variables. useState returns value of the function to update , 
    //using empty string for default value
    //when the input is changed , onChange handler will be called and updated
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    //preventDefault is called on the event when submitting the form to prevent a browser refresh.
    const formSubmit = (event) => {
        event.preventDefault();
        // axios.post('http://localhost:5000/login/home/booking', {
        // post request is made to perform task
        axios.post('/login/home/booking', {
            name: props.name,
            nric: props.nric,
            category: category,
            location: location,
            date: date,
            time: time
            //response from backend service
        }).then(res => {
            alert(JSON.stringify(res.data));
            setClick(click + 1);
        }).catch(error => {
            console.log(error.response)
        });
    }

    //to delete the booked appointment
    const deleteBooking = (event) => {
        let element = event.currentTarget;
        // axios.delete('http://localhost:5000/login/home/' + element.id)
        axios.delete('/login/home/' + element.id)
            .then(res => {
                if (res.status === 204) {
                    setClick(click + 1);
                }
                else
                    alert("can't delete");
            }).catch(error => {
                console.log(error.response)
            });
    }

    const logout = () => {
        history.push('/');
    }

    return (
        <div>
            <h1> Covid19 Appointment Management System</h1>
            <Button className="float-right" variant="danger" onClick={logout}>Logout</Button>
            <Tabs defaultActiveKey="booking">
                <Tab eventKey="booking" title="View Bookings">
                    <h3>List of Booking: {props.name}</h3>
                    <Table striped bordered hover variant="=outlined-dark">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* connecting with booking table in database,to iterate values to update table in db  */}
                            {booking.map(booking => {
                                return <tr key={booking.id} >
                                    <td>{booking.category}</td>
                                    <td>{booking.location}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.time}</td>
                                    <td><Button onClick={(event) => deleteBooking(event)} id={booking.id} variant="danger">Delete</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="addbooking" title="Book Appointment">
                    <br></br>
                    <Card className="bg-light mx-auto" style={{ width: '40rem' }}>
                        <Card.Header>Add Booking</Card.Header>
                        <Form onSubmit={(event) => formSubmit(event)}>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>Masks</option>
                                    <option>Token</option>
                                    <option>Vaccination</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="location">
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="select" value={location} onChange={e => setLocation(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>Jurong</option>
                                    <option>Changi</option>
                                    <option>Punggol</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control as="select" value={date} onChange={e => setDate(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>25/01/2021</option>
                                    <option>26/01/2021</option>
                                    <option>27/01/2021</option>
                                    <option>28/01/2021</option>
                                    <option>29/01/2021</option>
                                    <option>30/01/2021</option>
                                    <option>31/01/2021</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="time">
                                <Form.Label>Time</Form.Label>
                                <Form.Control as="select" value={time} onChange={e => setTime(e.target.value)}>
                                    <option>Choose...</option>
                                    <option>10AM</option>
                                    <option>11AM</option>
                                    <option>12PM</option>
                                    <option>1PM</option>
                                    <option>2PM</option>
                                    <option>3PM</option>
                                    <option>4PM</option>
                                    <option>5PM</option>
                                    <option>6PM</option>
                                </Form.Control>
                            </Form.Group>

                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
export default BookingPage;
