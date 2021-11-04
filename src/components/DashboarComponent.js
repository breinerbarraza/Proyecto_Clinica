import React from "react";
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Doughnut } from 'react-chartjs-2';
export const DashboarComponent = () => {

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
            <div className="container-dashboar">
                <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboar"><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                <div className="_conatiner-dashboar">
                    <div className="select-dashboar">
                        <select className="form-select" aria-label="Default select example">
                            <option defaultValue>Mes</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                    <div className="table-dashboar">
                        <table className="table table-hover ">
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Operado</td>
                                    <td>15</td>
                                </tr>
                                <tr>
                                    <td>Programdo</td>
                                    <td>23</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="grafica">
                    <Doughnut data={data} />
                </div>
            </div>

        </>
    );
};
