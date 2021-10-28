import React from 'react'

export const CrearUsuarioComponent = () => {
    return (
        <>
            <div className="usuario-container">
                <form className="formulario-usuario">
                    <h3 className="h3-usuario"> Crear Usuariuo</h3>
                    <label htmlFor="tipo">Tipo de Documento</label>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Tipo de documeto</option>
                            <option value="1">Cedula de Ciudadania</option>
                            <option value="2">Cedula Extrangera</option>
                            <option value="3">Targeta de Identidad</option>
                            <option value="4">Registro Civil</option>
                        </select>
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" className="form-control" placeholder="Nombre"/>
                    <label htmlFor="apellido">Apellidos</label>
                    <input type="text" className="form-control" placeholder="Apellidos"/>
                    <div className="E-C_usuraio">
                        <div className="container-ce-usuario">
                            <label htmlFor="celular">Celular</label>
                            <input type="text" className="form-control" placeholder="Celular"/>
                        </div>
                    
                        <div className="container-e-usuario">
                            <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" placeholder="Email..."/>
                        </div>
                    </div>
                        <div className="cargo_usuario">
                            <label htmlFor="cargo">Cargo</label>
                            <input type="text" className="form-control" placeholder="Cargo..."/>
                        </div>
                    
                    <button type="submit" className="button_usuario">Crear Usario</button>
                </form>
            </div>
        </>
    )
}
