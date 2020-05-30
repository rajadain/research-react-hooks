import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import { ProvideAuth } from './hooks/useAuth';
import Login from './pages/login';
import Projects from './pages/projects';

function App() {
    return (
        <ProvideAuth>
            <div className='App'>
                <Router>
                    <Switch>
                        <Route path='/projects'>
                            <Projects />
                        </Route>
                        <Route path='/'>
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ProvideAuth>
    );
}

export default hot(App);
