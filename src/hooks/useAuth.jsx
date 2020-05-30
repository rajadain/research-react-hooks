import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

import { URLS } from '../constants';

const authCtx = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authCtx.Provider value={auth}>{children}</authCtx.Provider>;
}

export const useAuth = () => {
    return useContext(authCtx);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Wrap any Firebase methods we want to use making sure ...
    // ... to save the user to state.
    const signin = (username, password) => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return axios({
            method: 'post',
            url: URLS.LOGIN,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            // Don't send existing credentials, we want new ones
            withCredentials: false,
        })
            .then(({ data }) => {
                setUser(data);
                return data;
            })
            .catch(() => {
                setUser(false);
            });
    };

    const signout = () => axios.get(URLS.LOGOUT).then(() => setUser(false));

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        axios.get(URLS.LOGIN).then(({ data }) => {
            if (!data.guest) {
                setUser(data);
            } else {
                setUser(false);
            }
        });
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        signout,
    };
}
