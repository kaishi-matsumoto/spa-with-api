/* import React, { Component } from 'react'; */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Pages from './Pages';


const App = (props) => {
  
    return (
      <div>
        <Router>
          <div>
           <Route path='/' render={routeProps => <Navbar {...routeProps} />}/>
            <Route path='/pages/:id' render={routeProps => <Pages {...routeProps} />}/>
          </div>
        </Router>
      </div>
    );
  }


export default App;