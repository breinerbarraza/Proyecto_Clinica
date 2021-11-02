import React from 'react'
import { HeaderComponent } from './HeaderComponent'
import { FormularioReferirComponent } from './FormularioComponent/FormularioReferirComponent';
import { PerfilComponent } from './perfil/PerfilComponent';


export const ReferirComponent = () => {
    return (
        <>

            <HeaderComponent users={true} dashboard={false}/> 
            <PerfilComponent/>
            <div className="referir-container">
                <FormularioReferirComponent/>
            </div>
        </>
    )
}
