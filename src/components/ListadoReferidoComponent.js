import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'

export const ListadoReferidoComponent = () => {

  const [data_listado, setData_listado] = useState([])

  const load = async () => {
    await API.get('api/referidos/')
      .then(resp => {
        // const item = resp.data
        // console.log(item)
        // setData_listado(item)
        resp.data.map((item) => (
          data.rows.push({
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/pendiente/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": item.estadoReferido
          })
        ))
      })
  }

  useEffect(() => {
    load()
  }, [])

  console.log(data_listado)
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
    rows: []

  };

  return (
    <div className="listaRefe">
      <HeaderComponent users={false} dashboard={true} />
      <PerfilComponent />
      <div className="lista-container">
        <h3 className="h3-Lista">listado de referido</h3>
        <div className="tabla-lista">
          {data.rows !== [] && (
            <MDBDataTable
              striped
              className="tabla-pacientes"
              bordered
              entrieslabel={[]}
              hover
              data={data}
            />
          )}
          {

          }
        </div>
      </div>
    </div>

  );
}


