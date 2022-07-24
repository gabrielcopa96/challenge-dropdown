import { useState } from 'react';

export const useModal = () => {

    const [estadoModal, setEstadoModal] = useState( false );


    return {
        estadoModal,
        setEstadoModal
    }
}

export default useModal;