import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import Chip from '@mui/material/Chip';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom'
import meses_map from '../Utils/Objmeses';

export const ListadoReferidoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)
  const [cmb_listado, setCmb_listado] = useState([]);
  const [meses, setMeses] = useState([]);
  const [data_meses, setData_meses] = useState([])

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        setMeses(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
          }])
        ))
      })
    setLoading(false)
  }

  const load_referidos_by_id = async(id_user)=>{
    setLoading(true)
    const obj = {
      id: id_user
    }
    console.log(obj)
    await API.post('api/referidos/get_referidos/', JSON.stringify(obj))
      .then(resp => {
        setMeses(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
          }]),
          console.log(data_listado)
        ))
      })
    setLoading(false)
  }

  const cargarEstados = async()=>{
    await API.get('api/configuracion/estadoReferido/')
    .then( data => {
      const resp = data.data;
      setCmb_listado(resp)
    })
    .catch( console.error);
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
    let id_user = JSON.parse(localStorage.getItem('id_user'));
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if(super_user){
      load()
    }else{
      load_referidos_by_id(id_user)
    }
    cargarEstados()
  }, []);

  const meses_anio = {
    '1': 'Enero',
    '2': "Febrero",
    '3': "Marzo",
    '4': "Abril",
    '5': "Mayo",
    '6': "Junio",
    '7': "Julio",
    '8': "Agosto",
    '9': "Septiembre",
    '10': "Octubre",
    '11': "Noviembre",
    '12': "Diciembre",
  };

  const handleSelectMonth = (e)=>{
    setData_meses([]);
    let arreglo_vacio = [0,1] //
    const mes_nombre = e.target.value
    const obj_nombre = meses.map(item => {
      return item.sys_fechaCreacion
    })
    let variable = "";
    let dia_mes = "";
    for(let x of obj_nombre){
      variable = x
      dia_mes = new Date(variable).getMonth() + 1
    }
    if(meses_anio[dia_mes] == mes_nombre){
      const dato = meses.filter(item => item)
      dato.map((item) => (
        setData_meses(data_meses => [...data_meses, {
          "id": item.id,
          "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
          "numeroIdentificacion": item.numeroIdentificacion,
          "correo_electronico": item.correo_electronico,
          "celular": item.celular,
          "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
        }])
      ))
    }else{
      setData_meses(arreglo_vacio)
    }
  }

  const handleSelectEstate = (e)=>{
    setData_meses([]);
    const data = meses.filter(item => item.estadoReferido === e.target.value)
    console.log(data)
    if(data.length > 0){
      data.map((item) => (
        setData_meses(data_meses => [...data_meses, {
          "id": item.id,
          "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
          "numeroIdentificacion": item.numeroIdentificacion,
          "correo_electronico": item.correo_electronico,
          "celular": item.celular,
          "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
        }])
      ))
    }
   
  }

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
    rows: (data_listado && data_meses.length == 0) ? data_listado : data_meses

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
                  onChange={handleSelectMonth}
              >
                {
                  meses_map.map((item, key)=> {
                    return <MenuItem key={key} value={item.mes}>{item.mes}</MenuItem>
                  })
                }
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
                  onChange={handleSelectEstate}
              >
                {
                  cmb_listado.map( (item, key) => {
                    return <MenuItem key={key} value={item.descripcion}>{item.descripcion}</MenuItem>
                  })

                }
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


