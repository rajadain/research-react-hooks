import React, { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

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
            url: 'https://staging.modelmywatershed.org/user/login',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(({ data }) => {
            setUser(data);
            return data;
        });
    };

    const signout = () =>
        axios
            .get('https://staging.modelmywatershed.org/user/logout')
            .then(() => setUser(false));

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any ...
    // ... component that utilizes this hook to re-render with the ...
    // ... latest auth object.
    useEffect(() => {
        const unsubscribe = axios
            .get('https://staging.modelmywatershed.org/user/login')
            .then(({ data }) => {
                if (!data.guest) {
                    setUser(data);
                } else {
                    setUser(false);
                }
            });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Return the user object and auth methods
    return {
        user,
        signin,
        signout,
    };
}
