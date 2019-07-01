import React from 'react';

import { LoginButton } from '../LoginButton';
import './style.scss';
import { useSession } from '../SessionProvider';
import { LogoutButton } from '../LogoutButton';
import { UserInfo } from '../UserInfo';

export const Header = (props) => {
    const { user } = useSession();
    return (
                    
        <header className='header'>
            <h1>Cirrus Store</h1>
            <nav className='nav'>
                {user && <UserInfo photo={user.photo} title={user.username} points={user.points}/>}
                {
                    !user ? <LoginButton/> : <LogoutButton />
                }
            </nav>
        </header>
                    
    )
}