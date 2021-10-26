import React from 'react'
import { HeaderComponent } from './HeaderComponent'


export const ReferirComponent = () => {
    return (
        <>
            <HeaderComponent users={true} dashboard={false}/> 
            <div className="referir-container">
                
            <form className="formulario-referir">
                <h3 className="h3-referir"> Referir paciente</h3>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" className="form-control w-50" placeholder="Nombre"/>
                <label htmlFor="apellido">Apellidos</label>
                <input type="text" className="form-control w-50" placeholder="Apellidos"/>
                <label htmlFor="fecha">Fecha de nacimiento</label>
                <input type="date" className="form-control w-50" placeholder="Fecha de naciemiento"/>

                <div className="contenedor-referir">
                    <div className="documento">
                        <label htmlFor="tipo">Tipo de Documento</label>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Tipo de documeto</option>
                            <option value="1">Cedula de Ciudadania</option>
                            <option value="2">Cedula Extrangera</option>
                            <option value="3">Targeta de Identidad</option>
                            <option value="4">Registro Civil</option>
                        </select>
                        <label htmlFor="identidad">Numero de identidad</label>
                        <input type="text" className="form-control" placeholder="Numero de identidad"/>
                    </div>
                    <div className="container-ce">
                        <label htmlFor="celular">Celular</label>
                        <input type="text" className="form-control" placeholder="Celular"/>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" placeholder="email"/>
                        <button type="submit">Referir</button>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}
