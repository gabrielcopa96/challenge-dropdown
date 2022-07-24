import { useState, useRef } from 'react';

export const useDropdown = () => {

    const inputRef = useRef();
    const scrollRef = useRef();

    const [ open, setOpen ] = useState( false );
    const [ currentPage, setCurrentPage ] = useState( 1 );
    const [ itemsPerPage, setItemsPerPage ] = useState( 20 );
    const [ sugerencias, setSugerencias ] = useState( [] );

    return {
        open,
        setOpen,
        sugerencias,
        setSugerencias,
        inputRef,
        scrollRef,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage
    }
}

export default useDropdown;