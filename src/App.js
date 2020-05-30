import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/login';

function App() {
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route path='/'>
                        <Login />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default hot(App);
