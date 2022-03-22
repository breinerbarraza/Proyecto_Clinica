import React from 'react'
import { useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import { PerfilComponent } from './perfil/PerfilComponent'
import { HeaderComponent } from './HeaderComponent'
import API from '../Utils/API'
import { InputGroup } from 'reactstrap'
var moment = require('moment')

export const TablaSolicitudes = () => {
    
    const [solicitudes, setSolicitudes] = useState([])
    const [fechaInicial, setFechaInicial] = useState("")
    const [fechaFinal, setFechaFinal] = useState("")
    const [today, setToday] = useState(new Date())
    
    useEffect(()=> {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        let id_empleado = (JSON.parse(localStorage.getItem("id_user"))) ? JSON.parse(localStorage.getItem("id_user")) : ""
        if(super_user){
            //Solicitudes pendientes generales que le aparecera al admministrador
            getCambioEstadoGeneral()
        }else{
            //Solicitudes pendientes que le aparecera al empleado
            getCambioEstadoById(id_empleado)
        }
        
    }, []);

    const getCambioEstadoGeneral = ()=>{
        API.get('api/referidos_cambio_estado/?recordatorio=2')
        .then( ({data}) => {
            const resp = data
            resp.map((item) =>{
                setSolicitudes(solicitudes => [...solicitudes,{  
                    "asesor": item.empleadoInicial,
                    "referido": item.referido,
                    "correo_electronico": (item.correo_electronico) ? item.correo_electronico : "-",
                    "estadoNuevo": item.estadoNuevo,
                    "fecha": item.fecha,
                    "observaciones"  : item.observaciones
                }])
                
            })
        })
        .catch(console.error)
    }

    const getCambioEstadoById = (id)=>{
        API.get(`api/referidos_cambio_estado/?id_empleado=${id}`)
        .then( ({data}) => {
            const resp = data
            resp.map((item) =>{
                setSolicitudes(solicitudes => [...solicitudes,{  
                    "asesor": item.empleadoInicial,
                    "referido": item.referido,
                    "correo_electronico": (item.correo_electronico) ? item.correo_electronico : "-",
                    "estadoNuevo": item.estadoNuevo,
                    "fecha": item.fecha,
                    "observaciones"  : item.observaciones
                }])
                
            })
        })
        .catch(console.error)
    }

    const filtrarDatos = (e)=>{ 
        if(fechaFinal == "" || fechaInicial == ""){
            return alert("Digite un rango de fechas")
        }
        setSolicitudes([])
        API.get(`api/referidos_cambio_estado/?fechaInicio=${fechaInicial}&fechaFinal=${fechaFinal}`)
        .then( ({data}) => {
            const resp = data
            resp.map((item) =>{
                setSolicitudes(solicitudes => [...solicitudes,{  
                    "asesor": item.empleadoInicial,
                    "referido": item.referido,
                    "correo_electronico": (item.correo_electronico) ? item.correo_electronico : "-",
                    "estadoNuevo": item.estadoNuevo,
                    "fecha": item.fecha,
                    "observaciones"  : item.observaciones
                }])
                
            })
        })
        .catch(console.error)
    }

    const data_solicitudes = {

        columns: [
            {
                label: 'Asesor',
                field: "asesor",
                sort: 'asc',
                width: 150,
            },

            {
                label: 'Referido',
                field: "referido",
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Correo electronico',
                field: 'correo_electronico',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Estado',
                field: 'estadoNuevo',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Fecha Gestion',
                field: 'fecha',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Observacion',
                field: 'observaciones',
                sort: 'asc',
                width: 100
            }
        ],
        rows: solicitudes

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
                data={data_solicitudes}
                noRecordsFoundLabel='No se han encontrado registros'
            />
        )
    }

  return (
    <>
      <PerfilComponent />
      <HeaderComponent users={false} dashboard={true} />
      <div class="lista-container">
        <h2 style={{fontSize: '25px', color: "#02305b"}}>Solicitudes pendientes</h2>
            <div style={{
                 display: 'inline-block', width: 600, padding: 10
            }}>
                <InputGroup>
                    <input
                        // InputProps={{inputProps: { min: moment(today).format('YYYY-MM-DD')} }}
                        min={moment(today).format('YYYY-MM-DD')}
                        style={{padding:15}}
                        type="date"
                        className="form-control"
                        name="fecha-inicio"
                        value={fechaInicial}
                        placeholder="Fecha inicial"
                        onChange={(e) => setFechaInicial(e.target.value)}
                        required
                    />
                    <input
                        min={moment(today).format('YYYY-MM-DD')}
                        style={{padding:15}}
                        type="date"
                        className="form-control"
                        name="fecha-final"
                        value={fechaFinal}
                        placeholder="Fecha final"
                        onChange={(e) => setFechaFinal(e.target.value)}
                        required
                    />
                </InputGroup>

            </div>
            <div style={{display:'inline-block'}}>
                <button style={{ 
                    backgroundColor: '#6b8dd6', 
                    color:'white',
                    marginLeft:'5px',
                    border:'none',
                    padding:4,
                    letterSpacing:1
                    }} 
                    onClick={()=> { filtrarDatos() }}>Filtrar</button>
            </div>
            <div className="tabla-lista">
                {showTable()}
            </div>   
        </div>  

    </>
  )
}
