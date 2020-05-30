import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import { ProvideAuth } from './hooks/useAuth';
import Login from './pages/login';
import Projects from './pages/projects/index';

function App() {
    return (
        <ProvideAuth>
            <div className='App'>
                <Router>
                    <Switch>
                        <AuthenticatedRoute path='/projects'>
                            <Projects />
                        </AuthenticatedRoute>
                        <Route path={['/login', '/']}>
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </ProvideAuth>
    );
}

export default hot(App);
