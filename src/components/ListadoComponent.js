import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact'
import { PerfilComponent } from './perfil/PerfilComponent';
import API from '../Utils/API';
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

export const ListadoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        console.log(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
            "comision": item.comision
          }])
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
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <div className="select-mes">

          <FormControl fullWidth  >
            <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
              <Select
                  name="mes"
                  label="Mes"
                  id="demo-simple-select-standard"
                  onChange={""}
              >
                <MenuItem >01</MenuItem>
                <MenuItem >02</MenuItem>
                <MenuItem >03</MenuItem>
                <MenuItem >04</MenuItem>
                <MenuItem >05</MenuItem> 
              </Select>
          </FormControl>
            </div>
          <div className="select-mes">
          <FormControl fullWidth  >
            <InputLabel shrink id="demo-simple-select-standard-label">Estado</InputLabel>
              <Select
                  name="estado"
                  label="Estado"
                  id="demo-simple-select-standard"
                  onChange={""}
              >
                <MenuItem >01</MenuItem>
                <MenuItem >02</MenuItem>
                <MenuItem >03</MenuItem>
                <MenuItem >04</MenuItem>
                <MenuItem >05</MenuItem> 
              </Select>
          </FormControl>
          </div>
        </div>
        <div className="tabla-lista">
          {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


