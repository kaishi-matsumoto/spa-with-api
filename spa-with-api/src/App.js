/* import React, { Component } from 'react'; */
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Pages from './Pages';


const App = props => {
  const { match } = props;
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            
            <Route path='/Pages' render={routeProps => <Pages {...routeProps} />}/>
          </div>
        </Router>
      </div>
    );
  }


export default App;