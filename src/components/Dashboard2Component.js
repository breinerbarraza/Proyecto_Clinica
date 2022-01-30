import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import 'chart.js/auto';
import { Line, Bar } from 'react-chartjs-2';
import meses_map from '../Utils/Objmeses';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';
import API from '../Utils/API';

var _ = require("lodash")

export const Dashboard2Component = () => {

    const [data_empleado, setDataEmpleado] = useState([])
    const [mes_Temporal, setMes_Temporal] = useState("");
    const [total_referidos, setTotal_referidos] = useState({});
    const [operaciones, setOperaciones] = useState({});
    const [gestiones, setGestiones] = useState({});
    const [total_comision, setTotal_comision] = useState({});
    const [programados, setProgramados] = useState({});
    const [prequirurgicos, setPrequirurgicos] = useState({});
    const [pendientes, setPendientes] = useState({});
    const [data_meses, setData_meses] = useState([]);

    const [metaReferidos, setMetaReferidos] = useState(0);
    const [metaOperaciones, setMetaOperaciones] = useState(0);
    const [metaGestion, setMetaGestion] = useState(0);
    const [metaProgramados, setMetaProgramados] = useState(0);
    const [metaPrequirurgicos, setMetaPrequirurgicos] = useState(0);
    const [metaPendientes, setMetaPendiente] = useState(0);
    const [arreglo_year, setArreglo_year] = useState([]);
    const [anio_Temporal, setAnio_Temporal] = useState("");

    function conseguirMetas_asesor(arreglo){
        const totalReferidos = arreglo.filter(item => item.tipoMeta == "referidos")
        const totalOperaciones = arreglo.filter(item => item.tipoMeta == "operaciones")
        const totalGestiones = arreglo.filter(item => item.tipoMeta == "gestiones")
        const totalProgramados = arreglo.filter(item => item.tipoMeta == "programados")
        const totalPrequirurgicos = arreglo.filter(item => item.tipoMeta == "pre-quirurgico")
        const totalPendientes = arreglo.filter(item => item.tipoMeta == "pendientes")

        const total = totalReferidos.map(item => item.cantidad)
        const operacion = totalOperaciones.map(item => item.cantidad);
        const gestion = totalGestiones.map(item => item.cantidad)
        const programado = totalProgramados.map(item => item.cantidad)
        const prequirurgico = totalPrequirurgicos.map(item => item.cantidad)
        const pendientes = totalPendientes.map(item => item.cantidad)
        setMetaReferidos(total)
        setMetaOperaciones(operacion)
        setMetaGestion(gestion)
        setMetaProgramados(programado)
        setMetaPrequirurgicos(prequirurgico)
        setMetaPendiente(pendientes)
    }

    const cargarSelect = ()=>{
        const fecha = new Date();
        const anio_actual = fecha.getFullYear()
        const arreglo = []
        for(let x = anio_actual; x <= 2100; x++){
          const obj = {
            valor: x
          }
          arreglo.push(obj)
        }
        setArreglo_year(arreglo)
    }


    const cargarAsesores = async () => {
        await API.get('api/usuarios/user/grupo_empleado')
            .then(resp => {
                const respuesta = resp.data;
                setDataEmpleado(respuesta);
            })
    }

    useEffect(() => {
        const super_user = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "";
        if (!super_user) {
            return window.location = "/";
        }
        cargarAsesores();
        cargarSelect();
    }, []);
    const handleMetasChangeMonth = async(e) => {
        setTotal_referidos({})
        setOperaciones({})
        setGestiones({})
        setTotal_comision({})
        const mes = e.target.value;
        setMes_Temporal(mes);
    }

    const handleSelectYear = (e)=>{
        const year = e.target.value;
        setAnio_Temporal(year)
    }

    const handleMetasAsesor = async(e)=>{
        const id_asesor = e.target.value;
        await API.get(`api/usuarios/metas/get_metas_month_asesor/?mes=${mes_Temporal}&id_asesor=${id_asesor}&anio=${anio_Temporal}`)
        .then( data => {
            const arreglo_meses = data.data;
            if(arreglo_meses.length > 0){
                const meses = arreglo_meses[0]
                const total_referido = arreglo_meses[1]
                const operaciones = arreglo_meses[2]
                const gestiones_ = arreglo_meses[3]
                const programados = arreglo_meses[4]
                const prequirurgicos = arreglo_meses[5]
                const pendientes = arreglo_meses[6]
                const total_comision_ = arreglo_meses[arreglo_meses.length - 1]
                setData_meses(meses);
                conseguirMetas_asesor(meses) //funcion y se le pasa el parametro de arreglo de metas
                setTotal_referidos(total_referido)
                setOperaciones(operaciones)
                setGestiones(gestiones_)
                setProgramados(programados)
                setPrequirurgicos(prequirurgicos)
                setPendientes(pendientes)
                setTotal_comision(total_comision_)
            }                
        })
    }

    const data = {
        labels : ['Referidos', 'Operaciones', 'Gestiones', 'Programados', 'Pre-quirurgicos', 'Pendientes'],
        datasets: [
            {
                label: `Datos reales`,
                data: [total_referidos.referidos,operaciones.operaciones,gestiones.gestiones, programados.programados, prequirurgicos.prequirurgicos, pendientes.pendientes],
                backgroundColor: '#826af9',
                tension: 0.7
            },
            {
                label: `Meta`,
                data: [metaReferidos, metaOperaciones, metaGestion, metaProgramados, metaPrequirurgicos, metaPendientes],
                backgroundColor: '#ff6c40',
                tension: 0.7
            }
            
        ]
    };

    return (
        <>
        <div className='dashboardm'>
            <HeaderComponent dashboard />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <div className="_h3">
                        <Link to="/listado" style={{ textDecoration: "none" }}>
                            <h3 className="h3-dashboard"><i className="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>

                    <div className="select-mes" style={{width:'145px'}}>
                            <FormControl fullWidth  >
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

                        </div>
                        <div className="select-mes" style={{width:'145px'}}>
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                                <Select
                                    name="mes"
                                    label="Mes"
                                    id="demo-simple-select-standard"
                                    style={{ marginBottom: "-4px" }}
                                    onChange={handleMetasChangeMonth}
                                >
                                    {
                                        meses_map.map((item, key) => {
                                            return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                        </div>
                        <div className="select-mes" style={{width:'145px'}}>
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Empleados</InputLabel>
                                <Select
                                    name="id_asesor"
                                    label="Asesores"
                                    id="demo-simple-select-standard"
                                    style={{ marginBottom: "-4px" }}
                                    onChange={handleMetasAsesor}
                                >
                                    {
                                        data_empleado.map((item, key) => {
                                            return <MenuItem key={key} value={item.id}>{item.first_name} {item.last_name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                        </div>

                    </div>                
                    <div className="grafica2" style={{ width: "40%" }}>
                        <Bar className="gra" data={data} />
                    </div>
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

}
