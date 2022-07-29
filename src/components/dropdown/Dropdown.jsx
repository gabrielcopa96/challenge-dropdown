import Modal from "../modal/Modal";

import { useData, useModal, useDropdown } from "../../hooks";

import styles from './css/dropdown.module.css';

import { useEffect, useState } from "react";


const Dropdown = () => {

    const [ pag, setPag ] = useState(20);
    
    useEffect(() => {
      if(pag > 20) {
        setSugerencias(registros.filter( dato => {
          const regex = new RegExp(inputRef.current.value, "gi");
            if(typeof dato[type] === "number") {
              return dato[type].toString().match(regex);
            }
            return dato[type].match(regex);
          }).slice(0, pag)
          );
      }
    }, [pag]);
    
    const { open, setOpen, sugerencias, setSugerencias, inputRef, scrollRef } = useDropdown();
    const { registros, datos, setDatos, type, setType } = useData();
    const { estadoModal, setEstadoModal } = useModal(); 

    const handleClickDrop = () => {
        
      const { value } = inputRef.current; // obtenemos el valor del input
      
      const shouldOpenDropDown = /[a-zA-Z\d\s]{1,254}$/.test(value); // validar que el input no este vacio

      setOpen(shouldOpenDropDown); // abre el dropdown si el input tiene algo y coincide con mi regex

      if(value.length > 0) {
        setSugerencias(registros.filter( dato => { // filtro los datos que coincidan con el input
          const regex = new RegExp(value, "gi");
            if(typeof dato[type] === "number") {
              return dato[type].toString().match(regex);
            }
            return dato[type].match(regex);
          }).slice(0, pag) // muestro los datos que coincidan con el input
        );
      };      
    }

    const openModal = (e, id, nombre, nit, razonsocial, codigo, telefono, editable = true) => {
      setEstadoModal(!estadoModal); // cambia el estado del modal

      inputRef.current.value = ""; // reset input

      if(nombre, nit, razonsocial, codigo, telefono) { // si existen estos datos, es porque se va a editar

      setDatos({ // setea los datos del modal
        id,
        nombre,
        nit,
        razonsocial,
        codigo,
        telefono,
        editable: false,
      })

      } else {
        setDatos( // setea los datos del modal
          {
            ...datos,
            editable: true,
          }
        )
      }
      setOpen(false); // cierra el dropdown
    }

  const handleScroll = () => {
    if(scrollRef.current) { //si existe el scroll
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current; //obtenemos el scroll
      const isBottom = (scrollHeight - scrollTop) - 1 === clientHeight;  //obtenemos si esta en el final

      if(isBottom) { //si esta en el final
        setPag(prev => prev + 20); //aumentamos el numero de registros
      }
    }   
  }

  return (
    <div className={styles.containerDropdown}>
        <div className={styles.filterdropdown}>
          <div>
            <input type="text" className={styles.inputDropDown} placeholder="buscar..." onKeyUp={handleClickDrop} ref={inputRef} onBlur={handleClickDrop}/>
            {
                open && <div className={styles.containOpen} ref={scrollRef} onScroll={handleScroll}>
          
                    <span onClick={(e) => openModal(e)}> + Agregar nuevo registro </span>
                    {sugerencias.map( (x,y) => <span key={y} onClick={(e) => openModal(e, x.id, x.nombre, x.nit, x['razon social'], x.codigo, x.telefono)}>{x.nombre}</span>)}

                </div>
            }
          </div>
          <select onChange={(e) => setType(e.target.value)} className={styles.selectFilter}>
            <option>Selecciona filtro...</option>
            <option value="codigo">Codigo</option>
            <option value="nombre">Nombre</option>
            <option value="razon social">Razon Social</option>
            <option value="nit">Nit</option>
            <option value="telefono">Telefono</option>
          </select>
          {
            estadoModal && <Modal estado={estadoModal} cambiarEstado={openModal} nombre={datos.nombre} nit={datos.nit} codigo={datos.codigo} razons={datos.razonsocial} telefono={datos.telefono} editable={datos.editable} id={datos.id}/>
          }
        </div>
        {/* <div>
          <h2>Mis registros</h2>
          <ol>
            {
              sugerencias.map( (x,y) => <li key={y}>{x.nombre}</li>)
            }
          </ol>
          <button onClick={() => setPag( prev => prev + 5)}>More Data</button>
        </div> */}
    </div>
  )
}

export default Dropdown