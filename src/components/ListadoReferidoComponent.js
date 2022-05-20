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
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';


export const ListadoReferidoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)
  const [cmb_listado, setCmb_listado] = useState([])
  const [data_meses, setData_meses] = useState([])
  const [mes_temporal, setMes_temporal] = useState("")
  const [state_superUser, setState_superUser] = useState(false)
  const [id_localStorage, setid_localStorage] = useState("")
  const [arreglo_year, setArreglo_year] = useState([])
  const [anio_temporal, setAnioTemporal] = useState("")
  //const [cedula_data, setCedula_data] = useState([]);
  const [estado_temporal, setEstadoTemporal] = useState("")
  const [estado_user_temporal, setEstado_userTemporal] = useState("")
  const [admin_bolean, setAdmin_bolean] = useState(false)
  const [dataEmpleado, setDataEmpleado] = useState([])

  const [spinner, setSpinner] = useState(true)

  useEffect(() => {
    let id_user = JSON.parse(localStorage.getItem('id_user'))
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    setState_superUser(super_user)
    setid_localStorage(id_user)
    cargarSelect()
    cargarEstados()
    cargarEmpleados()
    if (super_user) {
      load()
      setAdmin_bolean(true)
    } else {
      load_referidos_by_id(id_user)
    }
  }, []);

  const cargarEmpleados = async () => {
    await API.get("api/usuarios/user/grupo_empleado_asesor").then((resp) => {
      const respuesta = resp.data;
      setDataEmpleado(respuesta);
    });
  };

  const borrarReferido = (id) =>{
      Swal.fire({
        text: '¿Estas seguro, no podras deshacer los cambios?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrarlo'
    })
    .then( async(result)=>{
      if (result.isConfirmed){
        //Logica para eliminar el referido  
          await API.delete(`api/referidos/${id}`)
          .then( (data) => {
            if(data.status == 204){
              Swal.fire(
                {
                  icon: "success",
                  text: "Referido eliminado",
                  showConfirmButton: false,
                  timer: 1500
                }
              )
              setTimeout(() => {
                return window.location = "/"
              }, 2000);
            }
          })
      }else{
          return Swal.fire({
              icon: 'error',
              text: "Me imagino que tu referido sigue salvo",
              showConfirmButton: false,
              timer: 1500
        })
      }
    })
  }

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        //setCedula_data(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
            "accion":
            <>
              <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={ () => borrarReferido(item.id) }><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
              <Link to={`actualizar_referido/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
            </>
          }])
        ))
      })
    setSpinner(false)
    setLoading(false)
  }

  const load_referidos_by_id = async (id_user) => {
    setLoading(true)
    const obj = {
      id: id_user
    }

    await API.post('api/referidos/get_referidos/', JSON.stringify(obj))
      .then(resp => {
        //setCedula_data(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
          }])
        ))
      })
    setSpinner(false)
    setLoading(false)
  }
  
  const cargarSelect = ()=>{
    const fecha = new Date();
    const anio_actual = fecha.getFullYear()
    const arreglo = []
    for(let x = anio_actual; x >= 1900; x--){
      const obj = {
        valor: x
      }
      arreglo.push(obj)
    }
    setArreglo_year(arreglo)
  }

  const cargarEstados = async () => {
    await API.get('api/configuracion/estadoReferido/')
      .then(data => {
        const resp = data.data;
        setCmb_listado(resp)
      })
      .catch(console.error);
  }


  

  const handleSelectMonth_admin = async (e) => {
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes)
    await API.get(`api/referidos/get_referidos_month/?mes=${mes}&anio=${anio_temporal}`)
      .then(data => {
        setData_meses([]);
        const arreglo_referidos_month = data.data;
        if (arreglo_referidos_month.length == 0) {
          setData_meses([0]);
        } else {
          arreglo_referidos_month.map((item) => {
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{ color: '#02305b' }}>Total comisiones: </b>,
              "accion":
              <>
                <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={ () => borrarReferido(item.id) }><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                <Link to={`actualizar_referido/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
              </>
            }]);
          })
        }
      })

  }

  const handleSelectMonth_rol = async (e) => {
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes)
    await API.get(`api/referidos/get_referidos_by_month_rol/?mes=${mes}&id_usuario_logeado=${id_localStorage}&anio=${anio_temporal}`)
      .then(data => {
        setData_meses([]);
        const arreglo_referidos_month = data.data;
        if (arreglo_referidos_month.length == 0) {
          setData_meses([0]);
        } else {
          arreglo_referidos_month.map((item) => {
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : "",
            }]);
          })
        }
      })
  }

  const handleSelectEstate_admin = async (e) => {
    setData_meses([]);
    const id_estado = e.target.value;
    setEstadoTemporal(id_estado)
    await API.get(`api/referidos/get_referidos_estado/?mes=${mes_temporal}&id_estado=${id_estado}&anio=${anio_temporal}`)
      .then(data => {
        const respuesta = data.data;
        setData_meses([]);  
        if (respuesta.length > 0) {
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
              "accion":
              <>
                <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={ () => borrarReferido(item.id) }><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                <Link to={`actualizar_referido/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
              </>
            }])
          ))
        } else {
          setData_meses([0]);
        }

      })
  }

  const handleSelectUserAdmin = async(e)=>{
    setData_meses([]);
    const users = e.target.value
    setEstado_userTemporal(users)
    await API.get(`api/referidos/get_referidos_estado/?mes=${mes_temporal}&id_estado=${estado_temporal}&anio=${anio_temporal}&id_users=${users}`)
      .then(data => {
        setData_meses([]);  
        const respuesta = data.data;
        console.log(data.data)
        if (respuesta.length > 0) {
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
              "accion":
              <>
                <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={ () => borrarReferido(item.id) }><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                <Link to={`actualizar_referido/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
              </>
            }])
          ))
        } else {
          setData_meses([0]);
        }

      })
    
  }

  const handleSelectCedula = async(e)=>{
    setData_meses([]);
    const cedula = e.target.value
    await API.get(`api/referidos/get_referidos_estado/?mes=${mes_temporal}&id_estado=${estado_temporal}&anio=${anio_temporal}&id_users=${estado_user_temporal}&name_or_cedula=${cedula}`)
      .then(data => {
        setData_meses([]);  
        const respuesta = data.data;
        console.log(data.data)
        if (respuesta.length > 0) {
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
              "accion":
              <>
                <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={ () => borrarReferido(item.id) }><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                <Link to={`actualizar_referido/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
              </>
            }])
          ))
        } else {
          setData_meses([0]);
        }

      })
  }

  const handleSelectEstate_rol = async (e) => {
    const id_estado = e.target.value;
    setEstadoTemporal(id_estado)
    setData_meses([]);
    await API.get(`api/referidos/get_referidos_estado_rol/?id_estado=${id_estado}&mes=${mes_temporal}&id_usuario_logeado=${id_localStorage}&anio=${anio_temporal}`)
      .then(data => {
        setData_meses([])
        const respuesta = data.data;
        if (respuesta.length > 0) {
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
            }])
          ))
        } else {
          setData_meses([0]);
        }

      })
  }

  //Filtro del nombre o cedula de referidos sin comision
  const handleSelectCedula_rol = async(e)=>{
    const cedula = e.target.value;
    setData_meses([]);
    await API.get(`api/referidos/get_referidos_estado_rol/?id_estado=${estado_temporal}&mes=${mes_temporal}&id_usuario_logeado=${id_localStorage}&anio=${anio_temporal}&name_or_cedula=${cedula}`)
      .then(data => {
        setData_meses([]);
        const respuesta = data.data;
        if (respuesta.length > 0) {
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`/lista/estado/${item.id}/`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
            }])
          ))
        } else {
          setData_meses([0]);
        }

      })
  }


  const handleYearChange = (e)=>{
    const anio = e.target.value
    setAnioTemporal(anio)
  }

  const dataAdmin = {

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

      {
        label: 'Accion',
        field: 'accion',
        sort: 'asc',
        width: 100
      },

    ],
    rows: ((data_listado && data_meses.length == 0)) ? data_listado : data_meses

  };


  const dataRol = {

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
      }

    ],
    rows: ((data_listado && data_meses.length == 0)) ? data_listado : data_meses

  };

  const showTable = () => {
    return (
      <MDBDataTable
        responsive
        hover
        striped
        small
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        data={(admin_bolean) ? dataAdmin : dataRol}
        noRecordsFoundLabel='No se han encontrado registros'

      />
    )
  }

  return (
    <>
      <div className="listaRefe">
        <PerfilComponent />
        <HeaderComponent users={false} dashboard={true} />

        <div className="lista-container">
          <h3 className="h3-Lista">Listado de referidos</h3>

          {
            (state_superUser) && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
              }}>
                
                <div className="select-mes">
                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Año</InputLabel>
                    <Select
                      name="anio"
                      label="Anio"
                      id="demo-simple-select-standard"
                      onChange={handleYearChange}
                    >
                      {
                        arreglo_year.map((item, key) => {
                          return <MenuItem key={key} value={item.valor}>{item.valor}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
                <div className="select-mes">

                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleSelectMonth_admin}
                    >
                      {
                        meses_map.map((item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
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
                      onChange={handleSelectEstate_admin}
                    >
                      {
                        cmb_listado.map((item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.descripcion}</MenuItem>
                        })

                      }
                    </Select>
                  </FormControl>
                </div>

                <div className="select-mes">
                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Empleados/Asesores</InputLabel>
                    <Select
                      name="estado"
                      label="Estado"
                      id="demo-simple-select-standard"
                      onChange={handleSelectUserAdmin}
                    >
                      {dataEmpleado.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.id}>
                            {item.first_name} {item.last_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div className="select-mes">
                  <div style={{marginTop: '-15px'}}>
                  <FormControl fullWidth  >
                      <TextField
                          type="text"
                          name="nombres"
                          placeholder="Escribe..."
                          label="Nombres o cédula"
                          className="form-control"
                          onChange={handleSelectCedula}
                          style={{ marginTop: '-20px' }}
                          InputLabelProps={{
                              shrink: true,
                          }}
                        />
                    </FormControl>
                  </div>
                    
                  </div>
              </div>
            )
           
          }


          {/* Si no es superuser y es por tipo de rol */}
          {
            !state_superUser && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 20
              }}>

                <div className="select-mes">
                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Año</InputLabel>
                    <Select
                      name="anio"
                      label="Anio"
                      id="demo-simple-select-standard"
                      onChange={handleYearChange}
                    >
                      {
                        arreglo_year.map((item, key) => {
                          return <MenuItem key={key} value={item.valor}>{item.valor}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>


                <div className="select-mes">

                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleSelectMonth_rol}
                    >
                      {
                        meses_map.map((item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
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
                      onChange={handleSelectEstate_rol}
                    >
                      {
                        cmb_listado.map((item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.descripcion}</MenuItem>
                        })

                      }
                    </Select>
                  </FormControl>
                </div>
                <div className="select-mes">
                  <div style={{marginTop: '-15px'}}>
                  <FormControl fullWidth  >
                      <TextField
                                type="text"
                                name="nombres"
                                placeholder="Escribe..."
                                label="Nombres o cédula"
                                className="form-control"
                                onChange={handleSelectCedula_rol}
                                style={{ marginTop: '-20px' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                    </FormControl>
                  </div>
                    
                  </div>
              </div>
            )
          }

          { 
            spinner && (
              <div style={{
                marginTop: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CircularProgress />
              </div>
            )
          }

          <div className="tabla-lista">
            {!loading && showTable()}
          </div>
        </div>
      </div>



      {/* ********************  */}
      {/* MEDIA QUERY */}

      <div className='quitar'>

        <div style={{ padding: "50px", width: "100%" }}>
          <div style={{ float: "none", marginTop: "-10px", marginLeft: "190px" }}>
            <i ><PerfilComponentSinNombre /></i>
          </div>
          <div className="lista-containers">
            <h3 className="h3-Lista">Listado de referidos</h3>

            {
              state_superUser && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 20
                }}>
                   <div className="select-mes">
                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Año</InputLabel>
                    <Select
                      name="anio"
                      label="Anio"
                      id="demo-simple-select-standard"
                      onChange={handleYearChange}
                    >
                      {
                        arreglo_year.map((item, key) => {
                          return <MenuItem key={key} value={item.valor}>{item.valor}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
                  <div className="select-mes">

                    <FormControl fullWidth  >
                      <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                      <Select
                        name="mes"
                        label="Mes"
                        id="demo-simple-select-standard"
                        onChange={handleSelectMonth_admin}
                      >
                        {
                          meses_map.map((item, key) => {
                            return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
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
                        onChange={handleSelectEstate_admin}
                      >
                        {
                          cmb_listado.map((item, key) => {
                            return <MenuItem key={key} value={item.id}>{item.descripcion}</MenuItem>
                          })

                        }
                      </Select>
                    </FormControl>
                  </div>



                </div>
              )
            }

            {/* Si no es superuser y es por tipo de rol */}
            {
              !state_superUser && (
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
                        onChange={handleSelectMonth_rol}
                      >
                        {
                          meses_map.map((item, key) => {
                            return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
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
                        onChange={handleSelectEstate_rol}
                      >
                        {
                          cmb_listado.map((item, key) => {
                            return <MenuItem key={key} value={item.id}>{item.descripcion}</MenuItem>
                          })

                        }
                      </Select>
                    </FormControl>
                  </div>
                </div>
              )
            }

            { 
            spinner && (
              <div style={{
                marginTop: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CircularProgress />
              </div>
            )
          }


            <div className="tabla-listas">
              {!loading && showTable()}
            </div>
          </div>
        </div>
        {/* FOOTER */}
        <HeaderMovil users={false} dashboard={true} />
      </div>
    </>

  );
}


