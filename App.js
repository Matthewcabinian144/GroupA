/**
 * This page allows users to book appointment. An alert will pop upon successful booking (it comes from the api-backend)
 * Users would be able to see their booking in the view booking page as well 
 * 
 * @author Surya Lekha
 */ 
import './App.css';
//importing the various components to be used in the form
import { Button, Tab, Tabs, Table, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
import axios from 'axios';


//useEffect accepts function 
function App() {
  const [booking, setBooking] = useState([]);
    useEffect(() => {
    // for sucessful request (get method to view booking)
    axios.get('http://localhost:5000/booking').then(res => {
      console.log(res.data);
      setBooking(res.data);
      //for unsucessful request
    }).catch(error => {
      console.log(error.response)
    });   
  }, []);

//const function to declare variables. useState returns value of the function to update , 
//using empty string for default value
//when the input is changed , onChange handler will be called and updated
  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

//preventDefault is called on the event when submitting the form to prevent a browser refresh.
  const formSubmit = (event) => {
    event.preventDefault();
    //console.log() method writes a message to the console,useful for testing purposes
    console.log(event);
    console.log("name", name);
    console.log("nric", nric);
    console.log("category", category);
    console.log("location", location);
    console.log("date", date);

// post request is made to perform task
    axios.post('http://localhost:5000/booking', {
      name: name,
      nric: nric,
      category: category,
      location: location,
      date: date
//response from backend service
    }).then(res => {  
      console.log(res.data);
      alert(JSON.stringify(res.data));
/**@exception for unsucessful request */
    }).catch(error => {
      console.log(error.response)
         });
  }
//to delete the booked appointment by id
  const deleteBooking = (event) => {
    let element = event.currentTarget;
    console.log(element.id);

    axios.delete('http://localhost:5000/booking/' + element.id)
      .then(res => {
        if (res.status === 204) {
          console.log('Deleting!');
          element.parentNode.removeChild(element);
        }
        else
          alert("can't delete");
      }).catch(error => {
        console.log(error.response)
      });
  }
  return (
    <div className="App">
      <h1> Covid19 Appointment Management System</h1>
      <Tabs defaultActiveKey="booking">
    {/* booked appointments will be seen here */}
        <Tab eventKey="booking" title="View Bookings">
          <h1>List of Booking</h1>
          <Table striped bordered hover variant="=outlined-dark"> 
            <thead>
              <tr>
                {/* table head titles */}
                <th>ID</th>
                <th>Name</th>
                <th>NRIC</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {/* connecting with booking table in database,to iterate values to update table in db  */}
              {booking.map(booking => {
                return <tr key={booking.id} id={booking.id} onClick={(event) => deleteBooking(event)}>
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.nric}</td>
                  <td>{booking.category}</td>
                  <td>{booking.location}</td>
                  <td>{booking.date}</td>
                </tr>
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="addbooking" title="Book Appointment">
          {/* card colour is called warning and mx-auto aligns it in the centre */}
          <Card className="bg-warning mb-3 mx-auto" style={{ width: '40rem' }}>
            <Card.Header>Add Booking</Card.Header>
            <Form onSubmit={(event) => formSubmit(event)}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" value={name}
                  onChange={e => setName(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="nric">
                <Form.Label>NRIC</Form.Label>
                <Form.Control type="text" placeholder="NRIC" value={nric}
                  onChange={e => setNric(e.target.value)} />
              </Form.Group>

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
                                
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
export default App;

