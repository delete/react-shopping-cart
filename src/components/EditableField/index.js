import React, { useState, useRef, useEffect } from 'react';
import { useKeySubmit } from '../../hooks/use-key-submit';
import Thumb from '../Thumb';

const EditableField = ({
    initialValue,
    onEnter,
    onEscape,
    type,
    inputMode,
    inputRender,
    fieldRender,
    ...props
}) => {
    const [isOpen, setIsOpem] = useState(false);
    const [value, setValue] = useState(initialValue);
    const previousValue = useRef(null);
        
    useEffect(() => {
        previousValue.current = value;
    }, [initialValue]);
    
    const toggle = () => setIsOpem(!isOpen);

    const handleSubmit = () => {
        onEnter && onEnter(value);
        toggle();
    };

    const handleEscape = () => {
        onEscape && onEscape();
        setValue(previousValue.current);
        toggle();
    }

    const handleOnChange = ({target: { value }}) => {
        // To number types, use "tel"! 
        // See https://github.com/facebook/react/issues/6556
        if(type === 'tel') {
            setValue(parseInt(value, 10) > 0 ? parseInt(value, 10) : 1);
        } else {
            setValue(value)
        }
    }
    
    const handleKeyDown = useKeySubmit(handleSubmit, handleEscape);

    return isOpen 
        ? 
            inputRender 
                ? 
                inputRender({type, inputMode, value, handleKeyDown, handleSubmit, handleOnChange, ...props})
                : (<div>
                    <input 
                        type={type}
                        inputMode={inputMode}
                        autoFocus
                        value={value}
                        onKeyDown={handleKeyDown}
                        onBlur={handleSubmit}
                        onChange={handleOnChange}
                        {...props}/>
                </div>) 
        : fieldRender ? fieldRender({value, toggle}) : <span role='button' tabIndex={0} onClick={toggle} title='Click to edit'>{value}</span>
        
}

export const EditableNumberField = ({initialValue, onEnter, onEscape}) => {
    return <EditableField
        initialValue={initialValue}
        onEnter={onEnter}
        onEscape={onEscape}
        type='tel'
        inputMode='numeric'
        min={0}
    />
}

export const EditableTextField = ({initialValue, onEnter, onEscape}) => {
    return <EditableField
        initialValue={initialValue}
        onEnter={onEnter}
        onEscape={onEscape}
        type='text'
        min={0}
    />
}

export const EditableImageField = ({initialValue, onEnter, onEscape}) => {
    return <EditableField
        initialValue={initialValue}
        onEnter={onEnter}
        onEscape={onEscape}
        type='text'
        inputRender={({type, inputMode, value, handleKeyDown, handleSubmit, handleOnChange, ...props}) => {
            return  <textarea 
                style={{resize: 'none'}}
                autoFocus
                rows="10"
                value={value}
                onKeyDown={handleKeyDown}
                onBlur={handleSubmit}
                onChange={handleOnChange}
                {...props}
            />
        }}
        fieldRender={({value, toggle}) => {
            return <Thumb
                src={value}
                onClick={toggle}
                alt={'New photo'}
            />
        }}
    />
}