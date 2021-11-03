import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'

export const ListadoReferidoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        resp.data.map((item) => (
          setData_listado(data_listado.concat({
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/pendiente/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": item.estadoReferido
          }))
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

  const data = {

    columns: [
      {

        label: 'Paciente',
        field: "get_nombreCompleto",
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
      <HeaderComponent users={false} dashboard={true} />
      <PerfilComponent />
      <div className="lista-container">
        <h3 className="h3-Lista">listado de referido</h3>
        <div className="tabla-lista">
            {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


