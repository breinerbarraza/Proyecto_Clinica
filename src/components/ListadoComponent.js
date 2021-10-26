import React from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';

export const ListadoComponent = () => {
    
    const data = {
        columns: [
          {
            label: 'Paciente',
            field: 'paciente',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Documento de identidad',
            field: 'identidad',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Correo',
            field: 'emali',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Celular',
            field: 'celular',
            sort: 'asc',
            width: 100
          },
          {
            label: 'Estado',
            field: 'estado',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Comisiòn',
            field: 'comision',
            sort: 'asc',
            width: 100
          }
        ],
        rows: [
          {
            paciente: 'Tiger Nixon',
            identidad: '12398712987389',
            emali: 'Edintiger@email.com',
            celular: '23827221',
            estado: 'Operado',
            comision: '$320'
          },
          {
            paciente: 'Garrett Winters',
            identidad: '12398712987389',
            emali: 'garrett@email.com',
            celular: '2134213432',
            estado: 'En gestiòn',
            comision: '$170'
          },
          {
            paciente: 'Ashton Cox',
            identidad: '12398712987389',
            emali: 'ashton@email.com',
            celular: '234234',
            estado: 'Operado',
            comision: '$86'
          },
          {
            paciente: 'Cedric Kelly',
            identidad: '12398712987389',
            emali: 'cedric@email.com',
            celular: '345634654',
            estado: 'Operado',
            comision: '$433'
          },
        ]
      };
    
      return (
        <div className="listaRefe">  
          <HeaderComponent users={false} dashboard={true}/>
          
          <div className="lista-container">
          <h3 className="h3-Lista">listado</h3>
          <div className="tabla-lista">
            <MDBDataTable
              striped
              bordered
              hover
              data={data}
            />
          </div>
          </div>
        </div>

      );
    }
    

