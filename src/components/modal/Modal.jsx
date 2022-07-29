import { useState, useEffect } from 'react';
import styles from './css/modal.module.css';

import { useAggregate, useUpdate } from '../../hooks';

const Modal = (props) => {
  
  const { estado, cambiarEstado, nombre, razons, nit, codigo, telefono, editable, id } = props; // me traigo los props del componente padre

  const [dataForm, setDataForm] = useState({ // me traigo los datos del formulario
    nombre: nombre,
    "razon social": razons,
    nit: nit,
    codigo: codigo,
    telefono: telefono,
  })

  useEffect(() => {

    return () => {
      if(editable === true) {
        setDataForm({
          nombre: "",
          "razon social": "",
          nit: 0,
          codigo: "",
          telefono: 0,
        });
      }  
    }

  }, [])
  

  const [confirm, setConfirm] = useState({ // me traigo los datos del formulario para verificar si estan correctos
    inputNombre: false,
    inputRazon: false,
    inputNit: false,
    inputCodigo: false,
    inputTelefono: false,
  });

  const { nuevoRegistro } = useAggregate( dataForm, cambiarEstado );

  const { updateRegistro } = useUpdate( dataForm, cambiarEstado, id );


  const handleSubmit = (e) => { // me traigo los datos del formulario
    e.preventDefault(); // evito que se recargue la pagina

    if(editable === false) { // si es un nuevo registro

      updateRegistro();

    } else {

      nuevoRegistro(); // llamo a la funcion para agregar un nuevo registro

    }
  }

  const handleChange = (e) => { // me traigo los datos del formulario
    setDataForm({ // actualizo el formulario
      ...dataForm, // me traigo los datos del formulario
      [e.target.name]: e.target.value // actualizo el dato del formulario
    })
  }

  return (
    <>
        <div className={styles.overlay}>
          <div className={styles.contenedorModal}>
            <form className={styles.encabezadoModal} onSubmit={handleSubmit}>
              <div className={styles.blockFormModal}>
                <label>Codigo: </label>
                <input type="text" placeholder={dataForm.codigo || 'introduzca un codigo'} value={dataForm.codigo} disabled={!editable ? true : false } name="codigo" onChange={handleChange}/>
              </div>
              <div className={styles.blockFormModal}>
                <label>Nombre: </label>
                <input type="text" placeholder={dataForm.nombre || 'introduzca el nombre'} value={dataForm.nombre} name="nombre" disabled={ (!confirm.inputNombre && !editable ) ? true : false } onChange={handleChange}/>
                <div className={styles.containerBtns}>
                  <button type="button" className={(!editable && !confirm.inputNombre) ? styles.btnEditar : styles.btnEditarDisabled} disabled={!editable ? false : true} onClick={() => setConfirm({...confirm, inputNombre: !confirm.inputNombre})}>Editar</button>
                  <button type="button" className={confirm.inputNombre ? styles.btnConfirmar : styles.btnConfirmarDisabled} disabled={confirm.inputNombre ? false : true} onClick={() => setConfirm({...confirm, inputNombre: !confirm.inputNombre})}>Confirmar</button>
                </div>
              </div>
              <div className={styles.blockFormModal}>
                <label>Razon Social: </label>
                <input type="text" placeholder={dataForm["razon social"] || 'introduzca la razon social'} value={dataForm["razon social"]} disabled={ (!confirm.inputRazon && !editable )? true : false } name="razon social" onChange={handleChange}/>
                <div className={styles.containerBtns}>
                  <button type="button" className={(!editable && !confirm.inputRazon) ? styles.btnEditar : styles.btnEditarDisabled} disabled={!editable ? false : true} onClick={() => setConfirm({ ...confirm, inputRazon: !confirm.inputRazon})}>editar</button>
                  <button type="button" className={confirm.inputRazon ? styles.btnConfirmar : styles.btnConfirmarDisabled} disabled={confirm.inputRazon ? false : true} onClick={() => setConfirm({ ...confirm, inputRazon: !confirm.inputRazon})}>Confirmar</button>
                </div>
              </div>
              <div className={styles.blockFormModal}>
                <label>Telefono: </label>
                <input type="number" placeholder={dataForm.telefono || '(011) 47234322'} value={dataForm.telefono} disabled={ (!confirm.inputTelefono && !editable) ? true : false } name="telefono" onChange={handleChange}/>
                <div className={styles.containerBtns}>
                  <button type="button" className={(!editable && !confirm.inputTelefono) ? styles.btnEditar : styles.btnEditarDisabled} disabled={!editable ? false : true} onClick={() => setConfirm({...confirm, inputTelefono: !confirm.inputTelefono})}>editar</button>
                  <button type="button" className={confirm.inputTelefono ? styles.btnConfirmar : styles.btnConfirmarDisabled} disabled={confirm.inputTelefono ? false : true} onClick={() => setConfirm({...confirm, inputTelefono: !confirm.inputTelefono})}>Confirmar</button>
                </div>
              </div>
              <div className={styles.blockFormModal}>
                <label>Nit: </label>
                <input type="number" placeholder={dataForm.nit || 'introduzca el nit'} value={dataForm.nit} disabled={ (!confirm.inputNit && !editable) ? true : false } name="nit" onChange={handleChange}/>
                <div className={styles.containerBtns}>
                  <button type="button" className={(!editable && !confirm.inputNit) ? styles.btnEditar : styles.btnEditarDisabled} disabled={!editable ? false : true} onClick={() => setConfirm({...confirm, inputNit: !confirm.inputNit})}>editar</button>
                  <button type="button" className={confirm.inputNit ? styles.btnConfirmar : styles.btnConfirmarDisabled} disabled={confirm.inputNit ? false : true} onClick={() => setConfirm({...confirm, inputNit: !confirm.inputNit})}>Confirmar</button>
                </div>
              </div>
              <button className={styles.btnAceptar} type="submit">Aceptar</button>
            </form>

            <button onClick={() => cambiarEstado(!estado)} className={styles.btnCerrarModal}>X</button>
          </div>
        </div>
    </>
  )
}

export default Modal