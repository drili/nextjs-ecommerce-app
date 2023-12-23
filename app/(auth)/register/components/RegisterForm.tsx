"use client"

import { useState } from 'react';
import { Button, Label, TextInput, Card } from 'flowbite-react';
import { toast } from 'react-hot-toast';

import SubHeading from '@/app/components/SubHeading';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const userData = {
            email,
            password,
            userFirstName,
            userLastName
        };

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json()

            toast.success("Registration successful.")
            console.log("Registration successful", result);

            setEmail('');
            setPassword('');
            setUserFirstName('');
            setUserLastName('');
        } catch (error) {
            toast.error("There was an error.")
            console.error('Registration failed:', error);
        }
    }

    return (
        <div id='component_RegisterForm' className='flex flex-col gap-4'>
            <Card>
                <SubHeading description='Fill out form to register your account' />
                <hr />

                <form className="flex flex-col gap-4" onSubmit={(event) => handleRegister(event)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            name="email" id="email" type="email" placeholder="name@flowbite.com" required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput
                            name='password' id="password" type="password" required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="userFirstName" value="First name" />
                        </div>
                        <TextInput
                            name='userFirstName' id="userFirstName" type="text" placeholder="" required
                            value={userFirstName}
                            onChange={(e) => setUserFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="userLastName" value="Last name" />
                        </div>
                        <TextInput
                            name='userLastName' id="userLastName" type="text" placeholder="" required
                            value={userLastName}
                            onChange={(e) => setUserLastName(e.target.value)}
                        />
                    </div>

                    <Button className='mt-5' type="submit" color='dark'>Register Account</Button>
                </form>
            </Card>
        </div>
    );
}

export default RegisterForm