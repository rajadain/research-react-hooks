import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

/** Modeled after
 *  https://tylermcginnis.com/react-router-protected-routes-authentication/
 *  with refinements from
 *  https://reacttraining.com/react-router/web/example/auth-workflow
 */

export default function AuthenticatedRoute({ children, ...props }) {
    const auth = useAuth();

    return (
        <Route
            {...props}
            render={({ location }) =>
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
