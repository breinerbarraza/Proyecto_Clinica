import React, { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Line } from 'react-chartjs-2';
import meses_map from '../Utils/Objmeses';
import API from '../Utils/API';

export const Dashboard2Component = () => {    

    useEffect(()=>{
        const super_user = (JSON.parse(localStorage.getItem('super_user'))) ? JSON.parse(localStorage.getItem('super_user')) : "";
        if(!super_user){
            window.location = "/";
        }
    }, []);
    
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
                'Agosto','Octubre','Nobiembre','Diciembre'],
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 10],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.5
        }]
    };

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
                    <div className="select-dashboard" style={{ width: "40%" }}>
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
                    <div className="grafica2" style={{ width: "40%" }}>
                        <Line classname="gra" data={data} />
                    </div>
                </div>
            </div>

        </>
    );

}
