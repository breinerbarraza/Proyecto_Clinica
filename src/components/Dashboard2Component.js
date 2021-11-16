import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Line } from 'react-chartjs-2';

export const Dashboard2Component = () => {

    // const getLavadosVsInfecto = async ()=> {
    //     let mesesdespachados = []
    //     let mesesinfecto = []
    //     await axios.get('https://inihos.lavanderiauniversal.com/api/clientes/dashboard_kilos_despachados/', {
    //         headers: {
    //             'Authorization': `Token ${this.state.token}`
    //         }
    //     }).then(response => {
    //         response.data.map((el) => (
    //             prendas_agrupado.push({
    //                 "kilos": el.kilos,
    //                 "fecha": el.fecha,
    //             })
    //         ))
    //         let despachadosAgrupados = _.groupBy(prendas_agrupado, (l) => { return l.fecha.substring(3, 5) })
    //         mesesdespachados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //         for (let i = 0; i < 12; i++) {
    //             let h = i > 9 ? "" + i : "0" + i;
    //             if (despachadosAgrupados[h]) {
    //                 let sum = 0.0;
    //                 despachadosAgrupados[h].forEach(item => { sum += parseFloat(item.kilos) });
    //                 mesesdespachados[i-1] = sum;
    //             }
    //         }
    //         // console.log(this.state.reportes)
    //     }).catch(e => {
    //         console.log(e.response.data)
    //     })
    //     await axios.get('https://inihos.lavanderiauniversal.com/api/clientes/dashboard_kilos_lavados_vs_infecto/', {
    //         headers: {
    //             'Authorization': `Token ${this.state.token}`
    //         }
    //     }).then(response => {
    //         response.data.filter(item => item.grado === 3).map((el) => (
    //             prendas_infecto_agrupado.push({
    //                 "cantidad": el.cantidad,
    //                 "fecha": el.fecha,
    //             })
    //         ))

    //         let infectoAgrupados = _.groupBy(prendas_infecto_agrupado, (l) => { return l.fecha.substring(3, 5) })
    //         mesesinfecto = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    //         for (let i = 0; i < 12; i++) {
    //             let h = i > 9 ? "" + i : "0" + i;
    //             if (infectoAgrupados[h]) {
    //                 let sum = 0.0;
    //                 infectoAgrupados[h].forEach(item => { sum += parseFloat(item.cantidad) });
    //                 mesesinfecto[i-1] = (100/mesesdespachados[i-1]) * sum;
    //             }
    //         }
    //     }).catch(e => {
    //         console.log(e.response.data)
    //     })
    //     this.setState({
    //         lavadoVsInfecto: {
    //             labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    //             datasets: [
    //                 {
    //                     label: '# de kilos despachados',
    //                     data: mesesdespachados,
    //                     backgroundColor: 'rgb(0, 149, 218)',
    //                     borderColor: 'rgba(0, 149, 218, 0.2)',
    //                     yAxisID: 'y',
    //                 },
    //                 {
    //                     label: '% de kilos infecto',
    //                     data: mesesinfecto,
    //                     backgroundColor: 'rgb(255, 0, 0)',
    //                     borderColor: 'rgba(255, 0, 0, 0.2)',
    //                     yAxisID: 'y1',
    //                 },
    //             ],
    //         }
    //     })
    // }
    
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
                                onChange={""}
                            >
                                <MenuItem >01</MenuItem>
                                <MenuItem >02</MenuItem>
                                <MenuItem >03</MenuItem>
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
