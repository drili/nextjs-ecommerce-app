'use client';

import { Button, Navbar, Dropdown, Avatar } from 'flowbite-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { useUser } from "@/app/context/UserContex";

interface NavbarLinkProps {
    link: string;
    children: React.ReactNode;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({
    link,
    children
}) => {
    return (
        <Link href={link}>
            <p className='block py-2 pr-4 pl-3 md:p-0 border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white'>
                {children}
            </p>
        </Link>
    )
}

function NavbarComponent() {
    const { user, setUser } = useUser();
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const handleLogout = () => {
        setUser(null)

        localStorage.removeItem('token');
        localStorage.removeItem("userData")
        // router.push("/")
    }

    return (
        <Navbar fluid className='px-0 py-4 pl-0 pr-0 lg:pl-0 lg:pr-0 border-b border-gray-100 mb-5'>
            {user ? (
                <Dropdown label="Store: Store 1" color='gray' placement="bottom">
                    <Dropdown.Item>Store 1</Dropdown.Item>
                    <Dropdown.Item>Store 2</Dropdown.Item>
                </Dropdown>
            ) : (
                <NavbarLink link='/'>NextJS Ecommerce App</NavbarLink>
            )}

            <div className="flex md:order-2">
                {user ? (
                    <div>
                        <span>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img="" rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{user.userFirstName} {user.userLastName}</span>
                                    <span className="block truncate text-sm font-medium">{user.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item>User Settings</Dropdown.Item>
                                <Dropdown.Item>Subscription</Dropdown.Item>
                                <Dropdown.Item>Contact Support</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>
                                    Logout
                                </Dropdown.Item>
                            </Dropdown>
                        </span>
                    </div>
                ) : (
                    <Link href="/login">
                        <Button color='gray'>Login</Button>
                    </Link>
                )}
                <Navbar.Toggle />
            </div>
            {user ? (
                <Navbar.Collapse>
                    <NavbarLink link='#'>Store Settings</NavbarLink>
                    <NavbarLink link='#'>Collections</NavbarLink>
                    <NavbarLink link="#">Products</NavbarLink>
                    <NavbarLink link="#">Product Properties</NavbarLink>
                </Navbar.Collapse>
            ) : (
                <Navbar.Collapse>
                    <NavbarLink link='/'>Home</NavbarLink>
                    <NavbarLink link="#">About</NavbarLink>
                    <NavbarLink link="#">Services</NavbarLink>
                    <NavbarLink link="#">Pricing</NavbarLink>
                    <NavbarLink link="#">Contact</NavbarLink>
                </Navbar.Collapse>
            )}

        </Navbar >
    );
}

export default NavbarComponent