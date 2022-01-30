import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import 'chart.js/auto';
import { Chart, Doughnut } from 'react-chartjs-2';
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
    const [total_referidos_first, setTotal_referidos_first] = useState("");
    const [anio_temporal, setAnio_temporal] = useState("");
    const [arreglo_year, setArreglo_year] = useState([]);

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

    const filter_cambio_estado = async (mes) => {
        await API.get(`api/referidos/dashboard_app/?mes=${mes}`)
            .then(response => {
                const resp = response.data;
                setDatosCambioEstado(resp)
            })
    }

    const cargarUsuarios = async () => {
        await API.get("api/usuarios/user/grupo_empleado/")
            .then(response => {
                const empleados = response.data;
                setUsuarios_employe(empleados)
            })
    }

    const cargarTotalReferidos = async (mes) => {
        await API.get(`api/referidos/get_count_referidos/?mes=${mes}`)
            .then(resp => {
                const total_referidos = resp.data;
                setTotal_referidos(total_referidos)
            })
    }

    const load = async () => {
        await API.get('api/referidos/')
            .then(response => {
                let agrupacion = _.chain(response.data).groupBy('estadoReferido')
                    .map((value, key) => ({
                        "estado": key,
                        "valor": value.length,
                        "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 255)) + ', 0.8)'
                    }))
                let agrupacionArray = _.toArray(agrupacion)
                setPieChartData(agrupacionArray)
                agrupacionArray.map((el) => (
                    setLabelColors(labelColors => [...labelColors, el.color]),
                    setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                    setCantidades(cantidades => [...cantidades, el.valor])
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

    const handleSelectYear = (e)=>{
        const anio = e.target.value;
        setAnio_temporal(anio);
    }

    const handleSelectMonth = async(e) => {
        setData_meses([]);
        setLabelColors([]);
        setTiposFormulario([]);
        setCantidades([]);
        setTotal_referidos_first(0);
        
        const mes = e.target.value;
        await API.get(`api/referidos/get_referidos_month/?mes=${mes}&anio=${anio_temporal}`)
        .then(response => {
            const referidos_data = response.data;
            if(referidos_data.length > 0){
                    cargarTotalReferidos(mes)
                    let agrupacion = _.chain(referidos_data).groupBy('estadoReferido')
                        .map((value, key) => ({
                            "estado": key,
                            "valor": value.length,
                            "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                                + (Math.floor(Math.random() * 256)) + ','
                                + (Math.floor(Math.random() * 255)) + ', 0.8)'
                        }))
                    let agrupacionArray = _.toArray(agrupacion)
                    setPieChartData(agrupacionArray)
                    agrupacionArray.map((el) => (
                        setLabelColors(labelColors => [...labelColors, el.color]),
                        setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                        setCantidades(cantidades => [...cantidades, el.valor])

                    ))
                }else{
                    setTotal_referidos({})
                    let agrupacion = _.chain(referidos_data).groupBy('estadoReferido')
                        .map((value, key) => ({
                            "estado": key,
                            "valor": value.length,
                            "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                                + (Math.floor(Math.random() * 256)) + ','
                                + (Math.floor(Math.random() * 255)) + ', 0.8)'
                        }))
                    let agrupacionArray = _.toArray(agrupacion)
                    setPieChartData(agrupacionArray)
                    agrupacionArray.map((el) => (
                        setLabelColors(labelColors => [...labelColors, el.color]),
                        setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                        setCantidades(cantidades => [...cantidades, el.valor])
                    ))
                }
            })
    }

    useEffect(async() => {
        await API.get('api/referidos/get_count_referidos_total/')
            .then(data => {
                const totalReferido = data.data;
                setTotal_referidos_first(totalReferido);
            })
    }, []);

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (!super_user) {
            return window.location = "/";
        }
        load()
        cargarSelect()

    }, []);

    return (
        <>
            <div className="dash">
                <HeaderComponent dashboard />
                <PerfilComponent />
                <div >
                    <div className="container-dashboard">
                        <div className="_h3">
                            <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboard" ><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                        </div>
                        <div className="select-dashboard" style={{ width: "48%" }}>
                           <FormControl fullWidth style={{ marginBottom: '15px', width:'200px'}}>
                                        <InputLabel shrink id="demo-simple-select-standard-label">Año</InputLabel>
                                        <Select
                                            name="anio"
                                            label="Año"
                                            id="demo-simple-select-standard"
                                            style={{ marginBottom: "-4px" }}
                                            onChange={handleSelectYear}
                                        >
                                            {
                                                arreglo_year.map((item, key) => {
                                                    return <MenuItem key={key} value={item.valor}>{item.valor}</MenuItem>
                                                })
                                            }
                                        </Select>
                            </FormControl>

                            <FormControl fullWidth style={{ marginBottom: '20px', marginLeft:'5px', width:'200px' }}>
                                <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                                <Select
                                    name="mes"
                                    label="Mes"
                                    id="demo-simple-select-standard"
                                    style={{ marginBottom: "-4px" }}
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
                        <b>Total referidos: </b>{(total_referidos_first == 0) ? total_referidos.Total_referidos : total_referidos_first}
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
                                    <div className="grafica" style={{ width: "40%", marginTop: "-80px" }}>
                                        <Doughnut classname="gra" data={data} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* Media Query */}

            <div className='quitar'>
                <div style={{ padding: "50px", width: "100%", marginTop:"60px" }}>
                    <div style={{ float: "none", marginTop: "-50px", marginLeft: "190px" }}>
                        <i><PerfilComponentSinNombre /></i>
                    </div>
                    <div className="lista-container_">
                        <div className="_h3_" >
                            <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboard" ><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                        </div>
                        <div className="select-dashboard" style={{ width: "100%" }}>
                        <FormControl fullWidth style={{ marginBottom: '15px'}}>
                                        <InputLabel shrink id="demo-simple-select-standard-label">Año</InputLabel>
                                        <Select
                                            name="anio"
                                            label="Año"
                                            id="demo-simple-select-standard"
                                            style={{ marginBottom: "-4px" }}
                                            onChange={handleSelectYear}
                                        >
                                            {
                                                arreglo_year.map((item, key) => {
                                                    return <MenuItem key={key} value={item.valor}>{item.valor}</MenuItem>
                                                })
                                            }
                                        </Select>
                            </FormControl>
                                
                                <FormControl fullWidth style={{ marginBottom: '15px'}}>
                                    <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                                    <Select
                                        name="mes"
                                        label="Mes"
                                        id="demo-simple-select-standard"
                                        style={{ marginBottom: "-4px" }}
                                        onChange={handleSelectMonth}
                                    >
                                        {
                                            meses_map.map((item, key) => {
                                                return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            <b>Total referidos: </b>{(total_referidos_first == 0) ? total_referidos.Total_referidos : total_referidos_first}
                            {
                                data_meses.length == 0 &&
                                (
                                    <div className="dashboard-flexbox" >
                                        <div className="table-dashboard_" style={{ width: "100%", marginTop: "12px" }}>
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
                                        
                                    </div>
                                )
                            }
                            <div className="grafica" style={{ width: "100%", marginTop: "30px" }}>
                                <Doughnut classname="gra" data={data} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* FOOTER */}
                <HeaderMovil users={true} dashboard={false} />
            </div>
        </>
    );
};


