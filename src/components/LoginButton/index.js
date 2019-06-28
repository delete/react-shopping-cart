import React from 'react';

import './style.scss';
import { useGoogleLogin } from '../../hooks/use-login';

export const LoginButton = () => {
    const {login} = useGoogleLogin();
    return <button className='login-button' onClick={login}>Entrar</button>
}