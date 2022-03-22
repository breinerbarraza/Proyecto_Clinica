import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import meses_map from '../Utils/Objmeses';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';
import Swal from 'sweetalert2';

export const ListadoUsuarioComponent = () => {

  const [data_listado, setData_listado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data_meses, setData_meses] = useState([]);
  const [group, setGroup] = useState([]);
  const [mes_temporal, setMes_temporal] = useState("")

  useEffect(() => {
    cargarGrupos()
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if (super_user) {
      load()
    } else {
      window.location = "/";
    }
  }, []);

  const load = async () => {
    setLoading(true)
    await API.get('api/usuarios/user/')
      .then(resp => {
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "nombre_completo": item.nombre_completo,
            "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
            "correo_electronico": item.email,
            "referidos": (item.total_referidos) ? item.total_referidos : 0,
            "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i className="fas fa-qrcode" ></i></span></a>,
            "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i className="fas fa-qrcode" ></i></span></a>,
            "rol": item.rol_,
            "is_active": <input onChange={item.is_active ? (e) => handleChangeActivo(e, item.id) : (e) => handleChangeNoActivo(e, item.id)} type="checkbox" checked={item.is_active && true} />
          }])
        ))
      })
    setLoading(false)
  }

  const handleChangeNoActivo = (e, id_user)=>{
    const obj = {
      id_user
    }
    Swal.fire({
      title: 'Estas seguro?',
      text: "Lo puedes cambiar mas adelante!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiarlo!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await API.put('api/usuarios/user/change_active/', JSON.stringify(obj))
          .then(({data})=>{
              if(data.msg){
                Swal.fire({
                  icon: 'success',
                  title: 'Exito!',
                  text: data.msg,
                  timer: 2500,
                  position: 'center',
                });
                setTimeout(()=>{
                  window.location = "/listado_usuario";
                }, 2000);
            }
            else{
                return Swal.fire({
                icon: 'error',
                text: data.error,
                timer: 2500,
                position: 'center',
              });
              
            }
        })
      }
    })
  } 

  const handleChangeActivo = (e, id_user)=>{
    const obj = {
      id_user
    }
    Swal.fire({
      title: 'Estas seguro?',
      text: "Lo puedes cambiar mas adelante!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiarlo!'
    }).then(async(result) => {
      if (result.isConfirmed) {
        await API.put('api/usuarios/user/change_desactive/', JSON.stringify(obj))
        .then(({data})=>{
            if(data.msg){
              Swal.fire({
                icon: 'success',
                text: data.msg,
                position: 'center',
              })
              setTimeout(()=>{
                window.location = "/listado_usuario";
              }, 2000);
          }
          else{
            return Swal.fire({
              icon: 'error',
              text: data.error,
              position: 'center',
            })
          }   
        })
      }
    })
  }

  const showTable = () => {
    return (
      <MDBDataTable
        hover
        responsive
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

  const cargarGrupos = async()=>{
    await API.get('api/usuarios/asesor/list_grupos')
            .then(({ data }) => {
                setGroup(data)
        })
  }

  const handleSelectMonth = async (e) => {
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes)
    if (mes !== 0) {
      await API.get(`api/usuarios/user/?mes=${mes}`)
        .then(
          data => {
            if (data.data.length > 0) {
              data.data.map((item) => (
                setData_meses(data_meses => [...data_meses, {
                  "id": item.id,
                  "nombre_completo": item.nombre_completo,
                  "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
                  "correo_electronico": item.email,
                  "referidos": (item.total_referidos) ? item.total_referidos : 0,
                  "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i className="fas fa-qrcode" ></i></span></a>,
                  "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i className="fas fa-qrcode" ></i></span></a>,
                  "rol": item.rol_,
                  "is_active": <input onChange={item.is_active ? (e) => handleChangeActivo(e, item.id) : (e) => handleChangeNoActivo(e, item.id)} type="checkbox" checked={item.is_active && true} />
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
          resp.data.map((item) => (
            setData_listado(data_listado => [...data_listado, {
              "id": item.id,
              "nombre_completo": item.nombre_completo,
              "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
              "correo_electronico": item.email,
              "referidos": (item.total_referidos) ? item.total_referidos : 0,
              "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i className="fas fa-qrcode" ></i></span></a>,
              "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i className="fas fa-qrcode" ></i></span></a>,
              "rol": item.rol_,
              "is_active": <input onChange={item.is_active ? (e) => handleChangeActivo(e, item.id) : (e) => handleChangeNoActivo(e, item.id)} type="checkbox" checked={item.is_active && true} />
            }])
          ))
        })
    }


  }

  const handleSelectTipoRol = async(e)=>{
    setData_meses([]);
    setData_listado([]);
    const id_grupo = e.target.value;
    await API.get(`api/usuarios/user/tipo_rol/?grupo=${id_grupo}&mes=${mes_temporal}`)
    .then( resp => {
      const respuesta = resp.data;
      respuesta.map((item) => (
        setData_listado(data_listado => [...data_listado, {
          "id": item.id,
          "nombre_completo": item.nombre_completo,
          "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
          "correo_electronico": item.email,
          "referidos": (item.total_referidos) ? item.total_referidos : 0,
          "QR_Paciente": (item.codigoqr_referidos == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_referidos}.png`}><span title="QR Paciente"><i className="fas fa-qrcode" ></i></span></a>,
          "QR_Asesor": (item.codigoqr_asesor == "") ? "" : <a href={`http://51.222.13.17:8081/media/uploads/${item.codigoqr_asesor}.png`}><span title="QR Asesor"><i className="fas fa-qrcode" ></i></span></a>,
          "rol": item.rol_,
          "is_active": <input onChange={item.is_active ? (e) => handleChangeActivo(e, item.id) : (e) => handleChangeNoActivo(e, item.id)} type="checkbox" checked={item.is_active && true} />
        }])
      ))
    });
  }

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
      {
        label: 'Rol_usuario',
        field: 'rol',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Activo',
        field: 'is_active',
        sort: 'asc',
        width: 100
      }
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

            <div className="select-mes" style={{marginLeft:'10px'}}>
                <FormControl fullWidth  >
                  <InputLabel shrink id="demo-simple-select-standard-label">Rol</InputLabel>
                  <Select
                    name="tipo_rol"
                    label="TipoRol"
                    id="demo-simple-select-standard"
                    onChange={handleSelectTipoRol}
                    >
                    <MenuItem value={0}>Todos los roles</MenuItem>
                    {
                      group.map((item, key) => {
                        return <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
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
      {/* Media Query de Usuario */}

      <div className='quitar'>
        <div style={{ padding: "50px", width: "100%" }}>
          <div style={{ float: "none", marginTop: "-10px", marginLeft: "190px" }}>
            <i><PerfilComponentSinNombre /></i>
          </div>
          <div className="lista-containers">
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
              <div className="select-mes" style={{marginLeft:'10px'}}>
                <FormControl fullWidth  >
                  <InputLabel shrink id="demo-simple-select-standard-label">Rol</InputLabel>
                  <Select
                    name="tipo_rol"
                    label="TipoRol"
                    id="demo-simple-select-standard"
                    onChange={handleSelectTipoRol}
                  >
                    {
                      group.map((item, key) => {
                        return <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
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
        {/* FOOTER */}
        <HeaderMovil users={true} dashboard={false} />
      </div>
    </>

  );
}


