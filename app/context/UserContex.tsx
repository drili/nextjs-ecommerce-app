"use client"

import React, { createContext, useContext, useState } from 'react';

interface UserProviderProps {
    children: React.ReactNode
}

interface UserContextProps {
    user: any,
    setUser: React.Dispatch<React.SetStateAction<any>>
}

export const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {}
})

export const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    const [user, setUser] = useState<any>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)