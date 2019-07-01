import { useCallback } from 'react';

const ENTER_CODE = 13;
const ESCAPE_CODE = 27;

export const useKeySubmit = (onEnter, onEscape) => {
  const handleKeyDown = useCallback( event => {
      if (event.keyCode === ENTER_CODE) {
        event.preventDefault();
        onEnter && onEnter();
      } else if (event.keyCode === ESCAPE_CODE) {
        onEscape && onEscape();
      }
    },
    [onEnter, onEscape]
  );

  return handleKeyDown;
};
