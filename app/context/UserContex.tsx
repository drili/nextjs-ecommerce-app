"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';

interface UserProviderProps {
    children: React.ReactNode;
}

interface UserContextProps {
    user: any;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    loading: boolean;
    updateUser: (userData: any) => void;
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => { },
    loading: true,
    updateUser: (userData) => {}
});

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const updateUser = (userData: any) => {
        setUser((currentUser: any) => {
            const updatedUser = { ...currentUser, ...userData }
            localStorage.setItem("userData", JSON.stringify(updatedUser))
            return updatedUser;
        })
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                setUser(JSON.parse(storedUserData));
            }

            setLoading(false);            
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);