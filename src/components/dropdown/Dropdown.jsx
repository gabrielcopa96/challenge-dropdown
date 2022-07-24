import { useEffect } from 'react';

import Modal from "../modal/Modal";

import { useData, useModal, useDropdown } from "../../hooks";

import styles from './css/dropdown.module.css';


const Dropdown = () => {

    const { misDatos, setMisDatos, datos, setDatos, type, setType } = useData();
    const { estadoModal, setEstadoModal } = useModal();
    const { open, setOpen, sugerencias, setSugerencias, inputRef, scrollRef, currentPage, setCurrentPage, setItemsPerPage, itemsPerPage } = useDropdown();

    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleClickDrop = () => {
        
      const { value } = inputRef.current;
      
      const shouldOpenDropDown = /[a-zA-Z\d\s]{1,254}$/.test(value);

      setOpen(shouldOpenDropDown);
      // if( inputRef.current ) {
      //   setOpen(true)
      // } else {
      //   setOpen(false)
      // }

      let matches = []

      if(value.length > 0) {
        matches = misDatos.filter( dato => {
          const regex = new RegExp(value, "gi");
            if(typeof dato[type] === "number") {
              return dato[type].toString().match(regex);
            }
            return dato[type].match(regex);
        })
      }

      let sug = matches.slice(indexOfFirstItem, indexOfLastItem);
      
      setSugerencias(sug);

    }

    const handleSelectProp = (e) => {
      setType(e.target.value);
    }


    useEffect(() => {
      console.log('se cambio de pagina')
    }, [currentPage])

    
    

    const openModal = (e, id, nombre, nit, razonsocial, codigo, telefono, editable = true) => {
      setEstadoModal(!estadoModal);
      if(nombre, nit, razonsocial, codigo, telefono) {

      setDatos({
        id,
        nombre,
        nit,
        razonsocial,
        codigo,
        telefono,
        editable: false,
      })

      } else {
        setDatos(
          {
            ...datos,
            editable: true,
          }
        )
      }
      setOpen(false);
    }

  return (
    <div className={styles.containerDropdown}>
        <div className={styles.filterdropdown}>
          <div>
            <input type="text" className={styles.inputDropDown} placeholder="buscar..." onKeyUp={handleClickDrop} ref={inputRef} onBlur={handleClickDrop}/>
            {
                open && <div className={styles.containOpen} ref={scrollRef}>
                  <span onClick={(e) => openModal(e)}> + Agregar nuevo registro </span>
                  {sugerencias.map( (x,y) => <span key={y} onClick={(e) => openModal(e, x.id, x.nombre, x.nit, x['razon social'], x.codigo, x.telefono)}>{x.nombre}</span>)}
                </div>
            }
          </div>
          <select onChange={handleSelectProp}>
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
    </div>
  )
}

export default Dropdown