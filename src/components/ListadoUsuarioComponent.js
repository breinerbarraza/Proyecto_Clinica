import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'

export const ListadoUsuarioComponent = () => {

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
            "estadoReferido": item.estadoReferido
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

  const data = {

    columns: [
      {

        label: 'Asesor',
        field: "asesor",
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
        label: 'Referidos',
        field: 'referido',
        sort: 'asc',
        width: 100
      },
    ],
    rows: data_listado

  };

  return (
    <div className="listaRefe">
      <HeaderComponent users={false} dashboard={true} />
      <PerfilComponent />
      
      <div className="lista-container">
        <h3 className="h3-Lista">Listado de usuario</h3>
        <Link to="/crear_usuario"><button className="btn btn-primary-outline crear-usuario">Crear usario <img style={{width:"20%"}}src={user_add_blue}/></button></Link>
        <div className="tabla-lista">
            {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


