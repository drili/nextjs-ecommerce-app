'use client';

import { toast } from 'react-hot-toast';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from '@/app/context/UserContex';
import { useStores } from '@/app/context/StoresContext';

import SubHeading from '@/app/components/SubHeading';

interface StoresModalNewProps {
    open: boolean;
    onClose: () => void;
}

const StoresModalNew: React.FC<StoresModalNewProps> = ({
    open,
    onClose
}) => {
    const { user, setUser, updateUser } = useUser();
    const { stores, setStores } = useStores()
    const [storeName, setStoreName] = useState("")
    const router = useRouter()

    const handleLogout = () => {
        setUser(null)

        localStorage.removeItem("token")
        localStorage.removeItem("user")
        localStorage.removeItem("userData")
        localStorage.removeItem("userStores")
    }

    const handleCreateStore = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const storeNameObj = {
            storeName
        }

        try {
            const response = await fetch(`/api/${user._id}/stores`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storeNameObj)
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json()

            toast.success("Store created successfully.")
            onClose()
            setStoreName("")

            const storeNameEscaped = result.store.storeNameEscaped
            const newStore = result.store
            updateUser({ activeStore: storeNameEscaped })
            setStores([...stores, newStore])

            router.push(`/dashboard/${user._id}`)
        } catch (error) {
            toast.error("There was an error.")
            console.error('Registration failed:', error);
        }
    }

    return (
        <div id='component_StoresModalNew'>
            <Modal show={open} onClose={onClose}>
                <Modal.Header>
                    <SubHeading description='Create a new store' />
                </Modal.Header>

                <Modal.Body className='pt-0 mt-5'>
                    <div className="space-y-6">
                        <div>
                            <form className="flex flex-col gap-4" onSubmit={(event) => handleCreateStore(event)}>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="storeName" value="Your store name" />
                                    </div>
                                    <TextInput name='storeName' id="storeName" type="text" placeholder="Awesome Store" required
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                    />
                                </div>
                                <Button className='mt-5' color='dark' type="submit">Create Store</Button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default StoresModalNew;