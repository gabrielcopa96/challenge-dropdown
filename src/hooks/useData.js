import { useState } from 'react';

import db from '../services/firebase';

import { useQuery } from 'react-query';

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

    const getData = async () => {
        const data = await getDocs( collection(db, "enterpise"));
        setMisDatos( data.docs.map( x => {
            return {
                id: x.id,
                ...x.data()
            }
        }) );
    
    }
    
    const {data: registros, isLoading, error} = useQuery(["registros"], getData);


   

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