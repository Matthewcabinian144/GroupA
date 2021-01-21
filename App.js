import './App.css';
import { Button, Tab, Tabs, Table, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
function App() {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    // Update the document title using the browser API
    axios.get('http://localhost:5000/booking').then(res => {
      console.log(res.data);
      setBooking(res.data);
    }).catch(error => {
      console.log(error.response)
      alert(JSON.stringify(error.response.data));
    });

  }, []);

  const [name, setName] = useState('');
  const [nric, setNric] = useState('');
  const [date, setDate] = useState('Choose...');
  const [category, setCategory] = useState('');

  const formSubmit = (event) => {
    event.preventDefault();
    console.log(event);
    console.log("name", name);
    console.log("nric", nric);
    console.log("date", date);
    console.log("category", category);

    axios.post('http://localhost:5000/booking', {
      name: name,
      nric: nric,
      date: date,
      category: category
    }).then(res => {
      console.log(res.data);
      alert(JSON.stringify(res.data));

    }).catch(error => {
      console.log(error.response)
      alert(JSON.stringify(error.response.data));
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
        <Tab eventKey="booking" title="Home">
          <h1>List of Booking</h1>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>NRIC</th>
                <th>Category</th>
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
                  <td>{booking.date}</td>

                </tr>
              })}
            </tbody>
          </Table>
        </Tab>
        <Tab eventKey="addbooking" title="Book Appointment">
          <Card className="bg-light mx-auto" style={{ width: '30rem' }}>
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

              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                {/* <DateTimePicker step={90} />
                <DateTimePicker defaultValue={new Date()} />
                <DateTimePicker min={new Date()} /> */}
                <Form.Control placeholder="Choose Date.." value={date} onChange={e => setDate(e.target.value)} />
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



