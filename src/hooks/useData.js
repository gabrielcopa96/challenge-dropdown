import { useEffect, useState } from 'react';

import db from '../services/firebase';

import { collection, getDocs } from "firebase/firestore";


export const useData = (data, setData) => {
    
    const [misDatos, setMisDatos] = useState( [] );

    const [type, setType] = useState( "nombre" );

    const [datos, setDatos] = useState( {
        id: '',
        nombre: '',
        razonsocial: '',
        nit: 0,
        telefono: 0,
        codigo: '',
        editable: false,
      } );
    
    useEffect(() => {


        if(misDatos.lenght) return;

        const getMisDatos = async () => {

            const datos = await getDocs(collection(db, "enterpise"));

            setMisDatos(datos.docs.map( x => {
                
                  return {
                      id: x.id,
                      ...x.data()
                  }
  
            }));

        }

        getMisDatos();

    }, [])


    return {
        misDatos,
        setMisDatos,
        datos,
        setDatos,
        type,
        setType
    }
}

export default useData;