import React from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'

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
            field: 'email',
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
            paciente: <Link to="/pre_quirurgico" style={{textDecoration:"none"}}>{}Breiner Barraza</Link>,
            identidad: '12398712987389',
            email: 'Edintiger@email.com',
            celular: '23827221',
            estado: 'Operado',
            comision: '$320'
          },
          {
            paciente: 'Garrett Winters',
            identidad: '12398712987389',
            email: 'garrett@email.com',
            celular: '2134213432',
            estado: 'En gestiòn',
            comision: '$170'
          },
          {
            paciente: 'Ashton Cox',
            identidad: '12398712987389',
            email: 'ashton@email.com',
            celular: '234234',
            estado: 'Operado',
            comision: '$86'
          },
          {
            paciente: 'Cedric Kelly',
            identidad: '12398712987389',
            email: 'cedric@email.com',
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
          <h3 className="h3-Lista">listado de referido</h3>
          <div className="tabla-lista">
            <MDBDataTable
              striped
              className="tabla-pacientes"
              bordered
              entrieslabel={[]}
              hover
              data={data}
            />
          </div>
          </div>
        </div>

      );
    }
    

