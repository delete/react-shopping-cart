import React from 'react';

import { LoginButton } from '../LoginButton';
import './style.scss';
import { useSession } from '../SessionProvider';
import { LogoutButton } from '../LogoutButton';
import { UserInfo } from '../UserInfo';

export const Header = (props) => {
    const { user } = useSession();
    return (
                    
        <header className='header' {...props}>
            {user && <UserInfo {...user}/>}
            {
               !user ? <LoginButton/> : <LogoutButton />
            }
        </header>
                    
    )
}