import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import meses_map from '../Utils/Objmeses';

export const ListadoUsuarioComponent = () => {

  const [data_listado, setData_listado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meses, setMeses] = useState([]);
  const [data_meses, setData_meses] = useState([]);

  const load = async () => {
    setLoading(true)
    await API.get('api/usuarios/user/')
      .then(resp => {
        console.log(resp.data)
        setMeses(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "nombre_completo": item.nombre_completo,
            "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
            "correo_electronico": item.email,
            "referidos": (item.total_referidos) ? item.total_referidos : 0,
            "QR_Paciente": ( item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></a> ,
            "QR_Asesor": ( item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></a> ,
          }])
        ))
      })
    setLoading(false)
  }



  const showTable = () => {
    return (
      <MDBDataTable
        striped
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        small
        data={data}
      />
    )
  }

  useEffect(() => {
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if(super_user){
      load()
    }else{
      window.location = "/";
    }
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
      return item.date_joined
    })
    console.log(obj_nombre)
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
            "nombre_completo": item.nombre_completo,
            "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
            "correo_electronico": item.email,
            "referidos": (item.total_referidos) ? item.total_referidos : 0,
            "QR_Paciente": ( item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></a> ,
            "QR_Asesor": ( item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></a> ,
        }])
      ))
    }else{
      setData_meses(arreglo_vacio)
    }
  }

  console.log(meses)

  const data = {

    columns: [
      {

        label: 'Usuario',
        field: "nombre_completo",
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
        field: 'referidos',
        sort: 'asc',
        width: 100
      },
      {
        label: 'QR Paciente',
        field: 'QR_Paciente',
        sort: 'asc',
        width: 100
      },
      {
        label: 'QR Asesores',
        field: 'QR_Asesor',
        sort: 'asc',
        width: 100
      },
    ],
    rows: (data_listado && data_meses.length == 0) ? data_listado : data_meses
  };

  return (
    <div className="listaRefe">
      <HeaderComponent users={false} dashboard={true} />
      <PerfilComponent />

      <div className="lista-container">
        <h3 className="h3-Lista">Listado de usuario</h3>
        <div className="subtitle-header">
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
            <div style={{flex: 5}}>

            </div>
            <div className="link-crearusuario">
              <Link to="/crear_usuario">
                <button className="btn btn-primary-outline crear-usuario">
                  Crear usuario <img style={{ width: "20%" }} src={user_add_blue} />
                </button>
              </Link>
            </div>
        </div>
        <div className="tabla-lista">
          {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


