import db from '../services/firebase';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDoc, doc } from 'firebase/firestore';


export const useUpdate = (dataForm, cambiarEstado, id ) => {

    const queryClient = useQueryClient();

    const editDocuments = async() => { // funcion para editar el registro
        
        const editDoc = doc(db, `enterpise`, id); // obtengo el documento
  
        await updateDoc(editDoc, { // actualizo el documento
          nombre: dataForm.nombre,
          "razon social": dataForm["razon social"],
          nit: dataForm.nit,
          codigo: dataForm.codigo,
          telefono: dataForm.telefono,
        });
  
        cambiarEstado(false); // cierro el modal
  
    }

    const { mutate: updateRegistro, error: errorUpdate } = useMutation(editDocuments, {
        onSuccess: () => {
          queryClient.invalidateQueries(["registros"]);
        }
    });

    return {
        updateRegistro,
        errorUpdate
    }

}

export default useUpdate;