"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

import { useUser } from '@/app/context/UserContex';

interface StoresContextProps {
    stores: any[],
    setStores: React.Dispatch<React.SetStateAction<any[]>>
}

const StoresContext = createContext<StoresContextProps>({
    stores: [],
    setStores: () => {},
})

export const useStores = () => useContext(StoresContext)

interface StoresProviderProps {
    children: React.ReactNode
}

export const StoresProvider: React.FC<StoresProviderProps> = ({ children }) => {
    const [stores, setStores] = useState<any>(null)
    const { user } = useUser()

    useEffect(() => {
        const fetchStores = async () => {
            if (user) {
                try {
                    const response = await fetch(`/api/${user._id}/stores`)
                    if (!response.ok) {
                        throw new Error(`Error fetching stores: ${response.statusText}`);
                    }

                    const data = await response.json()
                    setStores(data)

                    console.log({data});
                    
                } catch (error) {
                    console.error('Error fetching stores:', error);
                }
            }
        }
        
        fetchStores();
    }, [user])

    return (
        <StoresContext.Provider value={{ stores, setStores }}>
            {children}
        </StoresContext.Provider>
    )
}