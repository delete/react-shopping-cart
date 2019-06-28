import React from 'react';

import './style.scss';
import { useGoogleLogin } from '../../hooks/use-login';

export const LogoutButton = () => {
    const {logout} = useGoogleLogin();
    return <button className='logout-button' onClick={logout}>Sair</button>
}