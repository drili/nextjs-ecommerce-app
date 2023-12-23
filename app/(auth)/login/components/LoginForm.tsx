"use client"

import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import SubHeading from '@/app/components/SubHeading';

import { useUser } from '@/app/context/UserContex';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { setUser } = useUser()
    const router = useRouter()

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        console.log({ email, password});
        
        const response = await fetch("/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json()
        localStorage.setItem("token", data.token)
        setUser(data.user)
        router.push(`/dashboard/${data.user._id}`)
    }

    return (
        <div id='component_LoginForm' className='flex flex-col gap-4'>
            <Card>
                <SubHeading description='Sign in' />
                <hr />

                <form className="flex flex-col gap-4" onSubmit={(event) => handleLogin(event)}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput 
                            id="email" type="email" placeholder="name@flowbite.com" required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput 
                            id="password" type="password" required 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <Button className='mt-5' type="submit" color='dark'>Sign In</Button>
                </form>
            </Card>
        </div>
    );
}

export default LoginForm