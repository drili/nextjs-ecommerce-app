"use client"

import React, { useEffect, useState } from 'react';

import { useUser } from '@/app/context/UserContex';

import StoresModal from '@/app/components/modals/StoresModal';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const { user } = useUser()

    const [stores, setStores] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false)

    const fetchStores = async (user: any) => {
        try {
            const response = await fetch(`/api/${user._id}/stores`)

            if (!response.ok) {
                throw new Error('Failed to fetch stores');
            }

            const data = await response.json()
            
            setStores(data)
        } catch (error) {
            console.error('Error fetching stores:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (user) {
            fetchStores(user);
        }
    }, [user])

    useEffect(() => {        
        if (!isLoading) {
            if (stores.length !== 0) {            
                setOpenModal(false)
            } else {
                setOpenModal(true)
            }
        }
    }, [stores, isLoading])

    return (
        <div id="pageLayout_DashboardLayout">
            {children}
            
            <StoresModal 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
            />
        </div>
    )
}