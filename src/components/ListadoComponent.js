import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom'
import API from '../Utils/API';
export const ListadoComponent = () => {

  const [data_listado, setData_listado] = useState([])

  useEffect(() => {
    API.get('api/referidos/')
    .then( resp => {
      const item = resp.data
      console.log(item)
      setData_listado(item)
    } )
  },[])
    const data = {
        columns: [
          {

            label: 'Paciente',
            field: 'get_nombreCompleto',
            //field: <Link to="/pre_quirurgico" style={{textDecoration:"none"}}>omar</Link>,
            sort: 'asc',
            width: 150
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
          {
            label: 'Comisiòn',
            field: 'comision',
            sort: 'asc',
            width: 100
          }
        ],
        rows: data_listado
          
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
    

