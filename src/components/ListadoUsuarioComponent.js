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
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';

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
            "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></a>,
            "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></a>,
          }])
        ))
      })
    setLoading(false)
  }



  const showTable = () => {
    return (
      <MDBDataTable
        hover
        striped
        small
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        data={data}
        noRecordsFoundLabel='No se han encontrado registros'
      />
    )
  }

  useEffect(() => {
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if (super_user) {
      load()
    } else {
      window.location = "/";
    }
  }, []);



  const handleSelectMonth = async (e) => {
    setData_meses([]);
    const mes = e.target.value;
    console.log(mes)
    if (mes !== 0) {
      await API.get(`api/usuarios/user/?mes=${mes}`)
        .then(
          data => {
            console.log(data.data);
            if (data.data.length > 0) {
              data.data.map((item) => (
                setData_meses(data_meses => [...data_meses, {
                  "id": item.id,
                  "nombre_completo": item.nombre_completo,
                  "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
                  "correo_electronico": item.email,
                  "referidos": (item.total_referidos) ? item.total_referidos : 0,
                  "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></a>,
                  "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></a>,
                }])
              ))
            } else {
              setData_meses([0])
            }

          }
        )
    } else {
      setData_meses([]);
      setData_listado([]);
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
              "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></a>,
              "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></a>,
            }])
          ))
        })
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
    <>
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
                    meses_map.map((item, key) => {
                      return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
            </div>
            <div style={{ flex: 5 }}>

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
      <div className='quitar'>
        <div style={{padding:"50px", marginLeft:"200px"}}>
          <i><PerfilComponentSinNombre /></i>
        </div>
        {/* FOOTER */}
        <HeaderMovil users={true} dashboard={false} />
      </div>
    </>

  );
}


