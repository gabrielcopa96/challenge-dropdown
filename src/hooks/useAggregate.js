
import db from '../services/firebase';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { collection, addDoc } from 'firebase/firestore';

export const useAggregate = (dataForm, cambiarEstado ) => {

    const queryClient = useQueryClient();

    console.log(dataForm);

    const newDocuments = async() => { // funcion para agregar un nuevo registro
        const newDoc = await addDoc(collection(db, "enterpise"), dataForm); // agrega el registro
    
        cambiarEstado(false); // cierro el modal
    }

    const { mutate: nuevoRegistro, error: errorNuevoRegistro, isLoading: isLoadingNuevoRegistro } = useMutation(newDocuments, {
        onSuccess: () => {
          queryClient.invalidateQueries(["registros"]);
        }
    });

    return {
        nuevoRegistro,
        errorNuevoRegistro,
        isLoadingNuevoRegistro,
    }

}

export default useAggregate;