import { useState } from 'react';
import styles from './css/modal.module.css';

import db from '../../services/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';


const Modal = (props) => {
  
  const { estado, cambiarEstado, nombre, razons, nit, codigo, telefono, editable, id } = props;

  const [dataForm, setDataForm] = useState({
    nombre: nombre,
    "razon social": razons,
    nit: nit,
    codigo: codigo,
    telefono: telefono,
  })
  

  const [confirm, setConfirm] = useState({
    inputNombre: false,
    inputRazon: false,
    inputNit: false,
    inputCodigo: false,
    inputTelefono: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if(editable === false) {

      const editDocuments = async() => {
        
        const editDoc = doc(db, `enterpise`, id);

        await updateDoc(editDoc, {
        nombre: dataForm.nombre,
        "razon social": dataForm["razon social"],
        nit: dataForm.nit,
        codigo: dataForm.codigo,
        telefono: dataForm.telefono,
      });

      cambiarEstado(false);

    }

    editDocuments();

    } else {

      const newDocuments = async() => {
        const newDoc = await addDoc(collection(db, "enterpise"), dataForm);

        cambiarEstado(false);
      }

      newDocuments();
    }
  }


  const handleChange = (e) => {
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value
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