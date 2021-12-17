
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalBody, ModalFooter, FormGroup, Input, Label, ModalHeader } from 'reactstrap';

const arreglo_meses = [
    {"valor": 1,"mes": "Enero"},
    {"valor": 2,"mes": "Febrero"},
    {"valor": 3,"mes": "Marzo"},
    {"valor": 4,"mes": "Abrir"},
    {"valor": 5,"mes": "Mayo"},
    {"valor": 6,"mes": "Junio"},
    {"valor": 7,"mes": "Julio"},
    {"valor": 8,"mes": "Agosto"},
    {"valor": 9,"mes": "Septiembre"},
    {"valor": 10,"mes": "Octubre"},
    {"valor": 11,"mes": "Noviembre"},
    {"valor": 12,"mes": "Diciembre"},
]

export const ComponentModalMetas = () => {

    const [metas_Modal, setMetas_Modal] = useState(true);
    const [dataForm, setDataForm] = useState({})

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
    }, []);

    const cerrarModal = ()=>{
        setMetas_Modal(false);
        return window.location = "/";
    }

    const handleInputChange = (e)=>{
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        });
    }

    const enviarMeta = (e)=>{
        e.preventDefault();
    }

    return (
             <Modal isOpen={metas_Modal} >
                <ModalHeader>
                    <div className="add_meta_msg">¡Agregar una meta!</div>
                </ModalHeader>
                <ModalBody>
                    <div className="body_modal">
                      <label >Mes</label>
                      <select name="mes">
                          <option selected="selected">--SELECCIONA UN MES</option>
                          { arreglo_meses.map( item => {
                              return <option value={item.valor}>{item.mes}</option>
                          })}
                      </select>
                      <label >Digita el año</label>
                      <input type="text"></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn btn-dark" onClick={enviarMeta}>Guardar Meta</Button>
                    <Button className="btn btn-dark" onClick={cerrarModal}>Cerrar</Button>
                </ModalFooter>
            </Modal> 
    )
}
