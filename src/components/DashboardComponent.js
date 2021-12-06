import React, { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Link } from "react-router-dom";
import { HeaderComponent } from "./HeaderComponent";
import { PerfilComponent } from "./perfil/PerfilComponent";
import { Doughnut } from 'react-chartjs-2';
import API from "../Utils/API";
import meses_map from '../Utils/Objmeses';

var _ = require('lodash')

export const DashboardComponent = () => {
    const [pieChartData, setPieChartData] = useState([])
    const [labelColors, setLabelColors] = useState([])
    const [tiposFormulario, setTiposFormulario] = useState([])
    const [cantidades, setCantidades] = useState([])
    const [meses, setMeses] = useState([]);
    const [data_meses, setData_meses] = useState([])

    /*
    - Cambiar las consultas del dashboard para que tenga los cambios de estado del referido
    - Colocar el filtro en ese reporte para filtrar por empleados

    */

    const filter_employess = async()=>{
        await API.get('api')
    }

    const load = async () => {
        await API.get('api/referidos/')
            .then(response => {
                // console.log(response.data)
                setMeses(response.data)
                let agrupacion = _.chain(response.data).groupBy('estadoReferido')
                    .map((value, key) => ({
                        "estado": key,
                        "valor": value.length,
                        "color": 'rgba(' + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 256)) + ','
                            + (Math.floor(Math.random() * 255)) + ', 0.8)'
                    }))
                let agrupacionArray = _.toArray(agrupacion)
                console.log("Datos de la agrupacion: ", agrupacionArray)
                setPieChartData(agrupacionArray)
                agrupacionArray.map((el) => (
                    setLabelColors(labelColors => [...labelColors, el.color]),
                    setTiposFormulario(tiposFormulario => [...tiposFormulario, el.estado]),
                    setCantidades(cantidades => [...cantidades, el.valor]),
                    console.log(`Estados: ${el}`)
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

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if(super_user){
        load()
        }
    }, []);
     const meses_anio = {
    '1': 'Enero',
    '2': "Febrero",
    '3': "Marzo",
    '4': "Abril",
    '5': "Mayo",
    '6': "Junio",
    '7': "Julio",
    '8': "Agosto",
    '9': "Septiembre",
    '10': "Octubre",
    '11': "Noviembre",
    '12': "Diciembre",
  };

  
  const handleSelectMonth = (e)=>{
    setData_meses([]);
    let arreglo_vacio = [0,1] //
    const mes_nombre = e.target.value
    const obj_nombre = meses.map(item => {
      return item.sys_fechaCreacion
    })
    let variable = "";
    let dia_mes = "";
    for(let x of obj_nombre){
      variable = x
      dia_mes = new Date(variable).getMonth() + 1
    }
    if(meses_anio[dia_mes] == mes_nombre){
      load();
    }else{
      setData_meses(arreglo_vacio)
      console.log("No hay nada")
    }
  }
  console.log(data_meses)
    return (
        <>
            <HeaderComponent dashboard />
            <PerfilComponent />
            <div >
                <div className="container-dashboard">
                    <div className="_h3">
                        <Link to="/listado" style={{ textDecoration: "none" }}><h3 className="h3-dashboard" ><i class="fas fa-angle-left" style={{ marginRight: "10px" }}></i>Dashboard</h3></Link>
                    </div>
                    <div className="select-dashboard" style={{ width: "40%" }}>
                        <FormControl fullWidth  >
                            <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                            <Select
                                name="mes"
                                label="Mes"
                                id="demo-simple-select-standard"
                                style={{ marginBottom: "-4px" }}
                                onChange={handleSelectMonth}
                            >
                                {
                                    meses_map.map((item, key)=> {
                                        return <MenuItem key={key} value={item.mes}>{item.mes}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>

                        {/* <FormControl fullWidth  >
                        <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                            <Select
                                name="usuarios"
                                label="usuarios"
                                id="demo-simple-select-standard"
                                style={{ marginBottom: "-4px" }}
                                onChange={""}
                            >
                                {
                                    usuarios_.map((item, key)=> {
                                        return <MenuItem key={key} value={item.id}>{item.nombre_completo}</MenuItem>
                                    })
                                }
                            </Select>
                    º   </FormControl>    */}

                    </div>
                    {
                        data_meses.length == 0 && 
                        (
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
                                <div className="grafica" style={{ width: "40%", marginTop:"-50px" }}>
                                    <Doughnut classname="gra" data={data} />
                                </div>
                            </div>
                        )
                    }
                    
                </div>
            </div>

        </>
    );
};
