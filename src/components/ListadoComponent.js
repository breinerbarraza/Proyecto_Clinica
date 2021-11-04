import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact'
import { PerfilComponent } from './perfil/PerfilComponent';
import API from '../Utils/API';
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip';

export const ListadoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{backgroundColor: 'red'}}/>,
            "comision": item.comision
          }]),
          console.log(data_listado)
        ))
      })
    setLoading(false)
  }

  const showTable = () => {
    return (
      <MDBDataTable
        striped
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        hover
        data={data}
      />
    )
  }

  useEffect(() => {
    load()
  }, [])

  console.log(data_listado)
  const data = {
    columns: [
      {

        label: 'Paciente',
        field: 'get_nombreCompleto',
        //field: <Link to="/pre_quirurgico" style={{textDecoration:"none"}}></Link>,
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
      <PerfilComponent />
      <HeaderComponent users={false} dashboard={true} />
      
      <div className="lista-container">
        <h3 className="h3-Lista">Listado de referidos</h3>
        <div className="tabla-lista">
          {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


