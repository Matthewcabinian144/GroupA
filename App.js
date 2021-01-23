import './App.css';
import { Button, Tab, Tabs, Table, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
import axios from 'axios';
//import { Redirect } from 'react-router-dom';

function App() {
  const [booking, setBooking] = useState([]);
    useEffect(() => {
    // Update the document title using the browser API
    axios.get('http://localhost:5000/booking').then(res => {
      console.log(res.data);
      setBooking(res.data);
    }).catch(error => {
      console.log(error.response)
    });   
  }, []);


  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');


  const formSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log("name", name);
    console.log("nric", nric);
    console.log("category", category);
    console.log("location", location);
    console.log("date", date);

    axios.post('http://localhost:5000/booking', {
      name: name,
      nric: nric,
      category: category,
      location: location,
      date: date

    }).then(res => {  
      console.log(res.data);
      alert(JSON.stringify(res.data));

    }).catch(error => {
      console.log(error.response)
         });
  }

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
        <Tab eventKey="booking" title="View Bookings">
          <h1>List of Booking</h1>
          <Table striped bordered hover variant="=outlined-dark"> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>NRIC</th>
                <th>Category</th>
                <th>Location</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
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
          <Card className="bg-light mx-auto" style={{ width: '40rem' }}>
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
