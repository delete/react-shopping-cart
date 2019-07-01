import React from 'react';

import './style.scss';

export const Drawer = ({ isOpen, onClose, children }) => {

    const handleClose = () => {
        onClose && onClose();
    }

    return (
        <div className={`drawer ${isOpen && 'drawer--open'}`}>
            {isOpen && (
                <div onClick={handleClose} className="drawer__close-btn">
                    X
                </div>
            )}
            <div className="drawer__content">{children}</div>
        </div>
    )
}