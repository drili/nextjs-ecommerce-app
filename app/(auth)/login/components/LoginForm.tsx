import { Button, Checkbox, Label, TextInput, Card } from 'flowbite-react';

import SubHeading from '@/app/components/SubHeading';

function LoginForm() {
    return (
        <div id='component_LoginForm' className='flex flex-col gap-4'>
            <Card>
                <SubHeading description='Sign in' />
                <hr />

                <form className="flex flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="name@flowbite.com" required />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput id="password" type="password" required />
                    </div>

                    <Button className='mt-5' type="submit" color='dark'>Sign In</Button>
                </form>
            </Card>
        </div>
    );
}

export default LoginForm