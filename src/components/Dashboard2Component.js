import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import meses_map from '../Utils/Objmeses';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';
import API from '../Utils/API';

export const Dashboard2Component = () => {

    const [data_asesor, setData_asesor] = useState([])
    const [mes_Temporal, setMes_Temporal] = useState("");
    const [total_referidos, setTotal_referidos] = useState({});
    const [operaciones, setOperaciones] = useState({});
    const [gestiones, setGestiones] = useState({});
    const [total_comision, setTotal_comision] = useState({});
    const [data_meses, setData_meses] = useState([]);

    const [metaReferidos, setMetaReferidos] = useState(0)
    const [metaOperaciones, setMetaOperaciones] = useState(0)
    const [metaGestion, setMetaGestion] = useState(0)

    function conseguirMetas_asesor(arreglo){
        const totalReferidos = arreglo.filter(item => item.tipoMeta == "referidos")
        const totalOperaciones = arreglo.filter(item => item.tipoMeta == "operaciones")
        const totalGestiones = arreglo.filter(item => item.tipoMeta == "gestiones")
        
        const total = totalReferidos.map(item => item.cantidad)
        const operacion = totalOperaciones.map(item => item.cantidad);
        const gestion = totalGestiones.map(item => item.cantidad)
        setMetaReferidos(total)
        setMetaOperaciones(operacion)
        setMetaGestion(gestion)
    }


    const cargarAsesores = async () => {
        await API.get('api/usuarios/user/grupo_asesor')
            .then(resp => {
                const respuesta = resp.data;
                console.log(respuesta)
                setData_asesor(respuesta);
            })
    }

    useEffect(() => {
        const super_user = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "";
        if (!super_user) {
            return window.location = "/";
        }
        cargarAsesores();
    }, []);

    const handleMetasChangeMonth = async(e) => {
        setTotal_referidos({})
        setOperaciones({})
        setGestiones({})
        setTotal_comision({})
        const mes = e.target.value;
        setMes_Temporal(mes)
      /*   await API.get(`api/usuarios/metas/get_metas_month/?mes=${mes}`)
            .then(resp => {
                const methas_mes = resp.data;
                setData_meses(methas_mes);
        }) */
    }

    const handleMetasAsesor = async(e)=>{
        const id_asesor = e.target.value;
        await API.get(`api/usuarios/metas/get_metas_month_asesor/?mes=${mes_Temporal}&id_asesor=${id_asesor}`)
        .then( data => {
            const arreglo_meses = data.data;
            const meses = arreglo_meses[0]
            const total_referido = arreglo_meses[1]
            const operaciones = arreglo_meses[2]
            const gestiones_ = arreglo_meses[3]
            const total_comision_ = arreglo_meses[arreglo_meses.length - 1]
            setData_meses(meses);
            conseguirMetas_asesor(meses) //funcion y se le pasa el parametro de arreglo de metas
            setTotal_referidos(total_referido)
            setOperaciones(operaciones)
            setGestiones(gestiones_)
            setTotal_comision(total_comision_)
            
        })
    }
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Octubre', 'Noviembre', 'Diciembre'];

    const data = {
        labels,
        datasets: [
            {
                label: `Gestiones ${(metaGestion != "") ? metaGestion : "0"}`,
                data: [100, 59, 80, 81, 56, 55, 96],
                fill: false,
                backgroundColor: '#826af9',
                tension: 0.7
            },
            {
                label: `Referidos ${(metaReferidos != "") ? metaReferidos : "0"}`,
                data: [100, 59, 80, 81, 56, 55, 96],
                fill: false,
                backgroundColor: '#ff6c40',
                tension: 0.7
            },
            {
                label: `Operaciones ${(metaOperaciones != "") ? metaOperaciones : "0"}`,
                data: [100, 59, 80, 81, 56, 55, 96],
                fill: false,
                backgroundColor: '#ffe700',
                tension: 0.7
            },
            
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
                        <div className="select-mes">
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

                        <div className="select-mes">
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Asesores</InputLabel>
                                <Select
                                    name="id_asesor"
                                    label="Asesores"
                                    id="demo-simple-select-standard"
                                    style={{ marginBottom: "-4px" }}
                                    onChange={handleMetasAsesor}
                                >
                                    {
                                        data_asesor.map((item, key) => {
                                            return <MenuItem key={key} value={item.id}>{item.first_name} {item.last_name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>

                        </div>

                    </div>
                    {
                        data_meses.length > 0 &&(
                            <>
                            <p>Referidos: {total_referidos.referidos}</p>
                            <p>Operaciones: {operaciones.operaciones}</p>
                            <p>Gestiones: {gestiones.gestiones}</p>
                            <p>Total Comision: {total_comision.total_comision}</p>
                            </>    
                        )
                    }
                
                    <div className="grafica2" style={{ width: "40%" }}>
                        <Line className="gra" data={data} />
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
