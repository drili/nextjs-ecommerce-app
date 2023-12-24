'use client';

import { toast } from 'react-hot-toast';
import { Button, Modal, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';

import { useUser } from '@/app/context/UserContex';

import SubHeading from '@/app/components/SubHeading';

interface StoresModalProps {
    open: boolean;
    onClose: () => void;
}

const StoresModal: React.FC<StoresModalProps> = ({
    open,
    onClose 
}) => {
    const { user, setUser } = useUser();
    const [storeName, setStoreName] = useState("")

    const handleLogout = () => {
        setUser(null)

        localStorage.removeItem("token")
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
            console.log(result.data);
            
            toast.success("Store created successfully.")

            onClose()
            setStoreName("")
        } catch (error) {
            toast.error("There was an error.")
            console.error('Registration failed:', error);
        }
    }

    return (
        <div id='component_StoresModal'>
            <Modal show={open} onClose={onClose}>
                <Modal.Body>
                    <div className='flex justify-between items-center'>
                        <SubHeading description='Create your first store here!' />
                        <Button onClick={handleLogout} color='gray'>Signout</Button>
                    </div>
                    <hr className='mt-5' />
                </Modal.Body>

                <Modal.Body className='pt-0'>
                    <div className="space-y-6">
                        <p className='text-md'>You must create a store to continue. Please fill out the form.</p>

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

export default StoresModal;