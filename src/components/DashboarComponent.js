import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Doughnut } from 'react-chartjs-2';
import API from "../Utils/API";

var _ = require('lodash')

export const DashboarComponent = () => {
    const [pieChartData, setPieChartData] = useState([])
    const [labelColors, setLabelColors] = useState([])

    const load = async () => {
        await API('/api/referidos/')
            .then(response => {
                console.log(response.data)
                let agrupacion = _.chain(response.data).groupBy('estadoReferido')
                    .map((value, key) => ({
                        "estado": key,
                        "valor": value.length,
                        "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 255)) + ', 0.5)'
                    }))
                let agrupacionArray = _.toArray(agrupacion)
                setPieChartData(agrupacionArray) 
            }).catch(console.error)
            pieChartData.map((el) => (
                setLabelColors(labelColors => [...labelColors, el.color]),
                console.log(labelColors)
            ))
    }
    console.log(pieChartData)
    useEffect(() => {
        load()
    }, [])

    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };
    return (
        <>
            <HeaderComponent />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboar"><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    <div className="select-dashboar" style={{ width: "40%" }}>
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Mes</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
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
                                    {pieChartData.map((el, key) => (
                                        <tr key={key}>
                                            <td>{el.estado}</td>
                                            <td>{el.valor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="grafica" style={{ width: "40%" }}>
                            <Doughnut classname="gra" data={data} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};
