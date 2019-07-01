import React from 'react';

import './style.scss'

export const UserInfo = ({ photo, title, points }) => (
    <div className='user-info'>
        <img src={photo} alt={`Foto de ${title}`} className='avatar'></img>
        <div>
            <span className='user-info__title'>{title}</span>
            <span className='user-info__points'>Você possui <strong>{points}</strong> ponto{points === 1 ? '' : 's'}</span>
        </div>
    </div>
)