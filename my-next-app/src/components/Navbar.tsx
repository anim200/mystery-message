"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User } from 'next-auth';
import { Button } from './ui/button';

const Navbar = () => {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Set the isClient flag to true after the component mounts
    setIsClient(true);
    if (session) {
      setUser(session.user as User);
    }
  }, [session]);

  if (!isClient) {
    // Render nothing or a placeholder until the component is mounted on the client
    return null;
  }

  return (
    <nav className='p-4 md:p-6 shadow-md'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
        <a className="text-xl font-bold mb-4 md:mb-0" href='#'>Mystery Message</a>
        {
          session ? (
            <>
              <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
              <Button className="w-full md:w-auto" onClick={() => signOut()}>Logout</Button>
            </>
          ) : (
            <Link href='/sign-in'>
              <Button className='w-full md:w-auto'>Log in</Button>
            </Link>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar;

