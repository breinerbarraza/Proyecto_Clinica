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

var _ = require('lodash')

export const DashboardComponent = () => {
    const [pieChartData, setPieChartData] = useState([])
    const [labelColors, setLabelColors] = useState([])
    const [tiposFormulario, setTiposFormulario] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [infoFull, setInfoFull] = useState([])


    const load = async () => {
        await API.get('api/referidos/')
            .then(response => {
                // console.log(response.data)
                let agrupacion = _.chain(response.data).groupBy('estadoReferido')
                    .map((value, key) => ({
                        "estado": key,
                        "valor": value.length,
                        "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 255)) + ', 0.8)'
                            
                    }))
                let agrupacionArray = _.toArray(agrupacion)
                console.log(agrupacionArray)
                setPieChartData(agrupacionArray)
                console.log(agrupacionArray)
                agrupacionArray.map((el) => (
                    setLabelColors(labelColors => [...labelColors, el.color]),
                    setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                    setCantidades(cantidades => [...cantidades, el.valor]),
                    console.log(`Estados: ${el}`),
                console.log("el valor"+labelColors)
                ))
            }).catch(console.error)

        setInfoFull({
            labels: tiposFormulario,
            datasets: [{
                label: 'My First Dataset',
                data: cantidades,
                backgroundColor: labelColors,
                hoverOffset: 4
            }]
        })
    }
    console.log(pieChartData)
    
    useEffect(() => {
        load()
    }, [])
    return (
        <>
            <HeaderComponent dashboard />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <div className="_h3">
                        <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboard"><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    </div>
                    <div className="select-dashboard" style={{ width: "40%" }}>
                        <FormControl fullWidth  >
                            <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                            <Select
                                name="mes"
                                label="Mes"
                                id="demo-simple-select-standard"
                                style={{ marginBottom: "-4px" }}
                                onChange={""}
                            >
                                <MenuItem >01</MenuItem>
                                <MenuItem >02</MenuItem>
                                <MenuItem >03</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="dashboard-flexbox">
                        <div className="table-dashboard">
                            <table className="table table-hover ">
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
                        <div className="grafica" style={{ width: "40%" }}>
                            <Doughnut classname="gra" data={infoFull} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
