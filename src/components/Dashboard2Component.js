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
import API from '../Utils/API';

export const Dashboard2Component = () => {    

    const [data_asesor, setData_asesor] = useState([])

    const cargarAsesores = async()=>{
        API.get('api/usuarios/user/grupo_asesor')
        .then( resp => {
            const respuesta = resp.data;
            console.log(respuesta)
            setData_asesor(respuesta);
        } )
    }

    useEffect(()=>{
        const super_user = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "";
        if(!super_user){
            return window.location = "/";
        }
        cargarAsesores();
    }, []);

    
    const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto','Octubre','Noviembre','Diciembre'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Cumplimientos de metas',
                data: [100, 59, 80, 81, 56, 55, 10],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.7
            }    
        ]
    };
    

    
    /* import React from 'react';
    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
    import { Line } from 'react-chartjs-2';
    import faker from 'faker';

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

    export const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top' as const,
        },
        title: {
        display: true,
        text: 'Chart.js Line Chart',
        },
    },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    export const data = {
    labels,
    datasets: [
        {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
    };

    export function App() {
    return <Line options={options} data={data} />;
    }
 */

    const handleMetasChange = (e)=>{
        const mes = e.target.value;
        console.log(mes);
        API.get(`api/usuarios/metas/get_metas_month/?mes=${mes}`)
        .then( resp => {
            const methas_mes = resp.data;
            console.log(methas_mes);
        } )
    }

    return (
        <>
            <HeaderComponent dashboard />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <div className="_h3">
                        <Link to="/listado" style={{ textDecoration: "none"}}>
                            <h3 className="h3-dashboard"><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    </div>
                    <div style={{display: 'flex',flexDirection: 'row',gap: 20}}>
                        <div className="select-mes">
                            <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                                <Select
                                    name="mes"
                                    label="Mes"
                                    id="demo-simple-select-standard"
                                    style={{ marginBottom: "-4px" }}
                                    onChange={handleMetasChange}
                                >
                                    {
                                        meses_map.map((item, key)=> {
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
                                    onChange={""}
                                >
                                    {
                                        data_asesor.map((item, key)=> {
                                            return <MenuItem key={key} value={item.id}>{item.first_name} {item.last_name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </FormControl>
                            
                        </div>

                    </div>

                    <div className="grafica2" style={{ width: "40%" }}>
                        <Line classname="gra" data={data} />
                    </div>
                </div>
            </div>

        </>
    );

}
