/**
 * This is the main application program that controls the routing to the other webpages
 * 
 * @author Ian Tjahjono
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Loginpage from './components/Loginpage';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/">
            <Loginpage></Loginpage>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
