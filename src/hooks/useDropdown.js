import { useState, useRef } from 'react';

export const useDropdown = () => {

    const inputRef = useRef();
    const scrollRef = useRef();

    const [ open, setOpen ] = useState( false );
    const [ sugerencias, setSugerencias ] = useState( [] );

    return {
        open,
        setOpen,
        sugerencias,
        setSugerencias,
        inputRef,
        scrollRef
    }
}

export default useDropdown;