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

    const cargarAsesores = async () => {
        API.get('api/usuarios/user/grupo_asesor')
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


    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Octubre', 'Noviembre', 'Diciembre'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Cumplimientos de metas',
                data: [100, 59, 80, 81, 56, 55, 96],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.7
            },
            
        ]
    };

    const handleMetasChangeMonth = async(e) => {
        const mes = e.target.value;
        setMes_Temporal(mes)
        await API.get(`api/usuarios/metas/get_metas_month/?mes=${mes}`)
            .then(resp => {
                const methas_mes = resp.data;
                console.log(methas_mes);
        })
    }

    const handleMetasAsesor = async(e)=>{
        const id_asesor = e.target.value;
        await API.get(`api/usuarios/metas/get_metas_month_asesor/?mes=${mes_Temporal}&id_asesor=${id_asesor}`)
        .then( data => {
            const respuesta = data.data;
            console.log(respuesta);
        })
    }

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
