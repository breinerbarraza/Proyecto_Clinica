import React from 'react'
import { HeaderComponent } from './HeaderComponent'
import { FormularioReferirComponent } from './FormularioComponent/FormularioReferirComponent';


export const ReferirComponent = () => {
    return (
        <>
            <HeaderComponent users={true} dashboard={false}/> 
            <div className="referir-container">
                <FormularioReferirComponent/>
            </div>
        </>
    )
}
