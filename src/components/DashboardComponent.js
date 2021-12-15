import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Doughnut } from 'react-chartjs-2';
import API from "../Utils/API";
import meses_map from '../Utils/Objmeses';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';

var _ = require('lodash')

export const DashboardComponent = () => {
    const [pieChartData, setPieChartData] = useState([])
    const [labelColors, setLabelColors] = useState([])
    const [tiposFormulario, setTiposFormulario] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [data_meses, setData_meses] = useState([])
    const [usuarios_, setUsuarios_employe] = useState([]);
    const [datosCambioEstado, setDatosCambioEstado] = useState([]);
    const [total_referidos, setTotal_referidos] = useState({});
    /*
    - Cambiar las consultas del dashboard para que tenga los cambios de estado del referido
    - Colocar el filtro en ese reporte para filtrar por empleados

    */

      useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if(super_user){
            load()
        }
    }, []);

    const filter_cambio_estado = async(mes)=>{
        await API.get(`api/referidos/dashboard_app/?mes=${mes}`)
        .then( response => {
            const resp  = response.data;
            console.log(resp);
            setDatosCambioEstado(resp)
        })
    }

    const cargarUsuarios = async()=>{
        await API.get("api/usuarios/user/grupo_empleado/")
        .then(response => {
            const empleados = response.data;
            console.log(empleados);
            setUsuarios_employe(empleados)
        })
    }

    const cargarTotalReferidos = async(mes)=>{
        await API.get(`api/referidos/get_count_referidos/?mes=${mes}`)
        .then( resp =>{
            const total_referidos = resp.data;
            console.log(total_referidos);
            setTotal_referidos(total_referidos)
        } )
    }

    const load = async () => {
        await API.get('api/referidos/')
            .then(response => {
                // console.log(response.data)
                console.log(response.data)
                let agrupacion = _.chain(response.data).groupBy('estadoReferido')
                    .map((value, key) => ({
                        "estado": key,
                        "valor": value.length,
                        "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 255)) + ', 0.8)'
                    }))
                let agrupacionArray = _.toArray(agrupacion)
                console.log("Datos de la agrupacion: ", agrupacionArray)
                setPieChartData(agrupacionArray)
                agrupacionArray.map((el) => (
                    setLabelColors(labelColors => [...labelColors, el.color]),
                    setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                    setCantidades(cantidades => [...cantidades, el.valor]),
                    console.log("Estados",  el)
                ))
            }).catch(console.error)

        
    
    }
    const data = {
        labels: tiposFormulario,
        datasets: [{
          label: 'My First Dataset',
          data: cantidades,
          backgroundColor: labelColors,
          hoverOffset: 4
        }]
      }

  
  
  const handleSelectMonth = async(e)=>{
    setData_meses([]);
    setLabelColors([]);
    setTiposFormulario([]);
    setCantidades([]);
    const mes = e.target.value;
    cargarTotalReferidos(mes)
    API.get(`api/referidos/get_referidos_month/?mes=${mes}`)
    .then( response => {
        console.log(response.data);
        let agrupacion = _.chain(response.data).groupBy('estadoReferido')
            .map((value, key) => ({
                "estado": key,
                "valor": value.length,
                "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                    + (Math.floor(Math.random() * 256)) + ','
                    + (Math.floor(Math.random() * 255)) + ', 0.8)'
            }))
        let agrupacionArray = _.toArray(agrupacion)
        console.log("Datos de la agrupacion: ", agrupacionArray)
        setPieChartData(agrupacionArray)
        agrupacionArray.map((el) => (
            setLabelColors(labelColors => [...labelColors, el.color]),
            setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
            setCantidades(cantidades => [...cantidades, el.valor]),
            console.log("Estados",  el)
        ))
    } )
  }

    return (
        <>
        <div className="dash">
            <HeaderComponent dashboard />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <div className="_h3">
                        <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboard" ><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    </div>
                    <div className="select-dashboard" style={{ width: "40%" }}>
                        <FormControl fullWidth style={{marginBottom:'15px'}}>
                            <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                            <Select
                                name="mes"
                                label="Mes"
                                id="demo-simple-select-standard"
                                style={{ marginBottom: "-4px" }}
                                onChange={handleSelectMonth}
                            >
                                {
                                    meses_map.map((item, key)=> {
                                        return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                     {/*    <FormControl fullWidth style={{marginBottom:'15px'}}>
                        <InputLabel shrink id="demo-simple-select-standard-label">Empleados</InputLabel>
                            <Select
                                name="usuarios"
                                label="usuarios"
                                id="demo-simple-select-standard"
                                style={{ marginBottom: "-4px" }}
                                onChange={""}
                            >
                                {
                                    usuarios_.map((item, key)=> {
                                        return <MenuItem key={key} value={item.id}>{item.first_name} {item.last_name}</MenuItem>
                                    })
                                }
                            </Select>
                       </FormControl>  */}  

                    </div>
                    
                    {
                        data_meses.length == 0 && 
                        (
                            <div className="dashboard-flexbox">
                                <div className="table-dashboard">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Tipo</th>
                                                <th>Cantidad</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pieChartData.map((dato, key) => (
                                                <tr key={key}>
                                                    <td>{dato.estado}</td>
                                                    <td>{dato.valor}</td>
                                                </tr>

                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="grafica" style={{ width: "40%", marginTop:"-50px" }}>
                                    <Doughnut classname="gra" data={data} />
                                </div>
                            </div>
                        )
                    }
                    <p className="p-total" style={{marginTop:'10px', marginBottom: '-10px'}}><b>Total referidos:</b> <b>{total_referidos.Total_referidos}</b></p>
                </div>
            </div>
            </div>
            <div className='quitar'>
                <div style={{ padding: "50px", marginLeft: "200px" }}>
                    <i><PerfilComponentSinNombre /></i>
                </div>
                {/* FOOTER */}
                <HeaderMovil users={true} dashboard={false} />
            </div>
        </>
    );
};
