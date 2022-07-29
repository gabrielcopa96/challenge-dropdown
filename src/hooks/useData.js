import { useState } from 'react';

import db from '../services/firebase';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';

import { collection, getDocs } from "firebase/firestore";


export const useData = () => {

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
        return data.docs.map( x => { return { id: x.id, ...x.data() } } );
    }
    
    const {data: registros, isLoading, error} = useQuery(["registros"], getData);



    return {
        registros,
        datos,
        setDatos,
        type,
        setType
    }
}

export default useData;