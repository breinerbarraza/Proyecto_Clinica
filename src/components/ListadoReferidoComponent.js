import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';

export const ListadoReferidoComponent = () => {


  const [data_listado, setData_listado] = useState([])

  useEffect(() => {
    API.get('api/referidos/')
    .then( resp => {
      const item = resp.data
      console.log(item)
      setData_listado(item)
    } )
  },[])
  console.log(data_listado)
    const data = {
      
        columns: [
          {

            label: 'Paciente',
            field:"get_nombreCompleto",
            sort: 'asc',
            width: 150,
          },
          {
            label: 'Documento de identidad',
            field: 'numeroIdentificacion',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Correo',
            field: 'correo_electronico',
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
            field: 'estadoReferido',
            sort: 'asc',
            width: 150
          },
        ],
        rows: data_listado
          
      };
    
      return (
        <div className="listaRefe">  
          <HeaderComponent users={false} dashboard={true}/>
          <PerfilComponent/>
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
            {

            }
          </div>
          </div>
        </div>

      );
    }
    

