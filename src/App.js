import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import routes from './Config/routes.js';
import AppRoute from './Components/AppRoute';
import Header from './Components/Layout/header';
import Navigation from './Components/Layout/navigation';
import Register from './Components/Login/register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Login from './Components/Login';

function App() {
  return (
    <React.Fragment>
      <Router>
        <React.Fragment>
          <Header />
          <div className="container app-container">
            <Navigation />

            <div className="container-fluid app-content">
              <Switch>
                {routes.map((route) => (
                  <AppRoute
                    key={route.path}
                    path={route.path}
                    component={route.component}
                    isPrivate={route.isPrivate}
                  />
                ))}
              </Switch>
            </div>
          </div>
        </React.Fragment>
      </Router>
    </React.Fragment>
  );
}

export default App;
