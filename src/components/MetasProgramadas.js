import React, { useEffect, useState } from 'react'
import API from '../Utils/API';
import { HeaderComponent } from './HeaderComponent';
import { PerfilComponent } from './perfil/PerfilComponent';
import {
  Chart as ChartJS,
  CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import MONTHS from '../Constants/LabelMonths';
import { MDBDataTable } from 'mdbreact';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const arreglo_meses = [
    { "valor": 1, "mes": "Enero" },
    { "valor": 2, "mes": "Febrero" },
    { "valor": 3, "mes": "Marzo" },
    { "valor": 4, "mes": "Abril" },
    { "valor": 5, "mes": "Mayo" },
    { "valor": 6, "mes": "Junio" },
    { "valor": 7, "mes": "Julio" },
    { "valor": 8, "mes": "Agosto" },
    { "valor": 9, "mes": "Septiembre" },
    { "valor": 10, "mes": "Octubre" },
    { "valor": 11, "mes": "Noviembre" },
    { "valor": 12, "mes": "Diciembre" },
]

const mapDatosParaGraficar=(datos)=>{
    const datasets=[]
    datos.forEach(y=>{
        let indice=datasets.findIndex(x=>x.label == y.tipoMeta)
        if(indice < 0){
            datasets.push({
                label:y.tipoMeta,
                data:MONTHS.map(m=>0),
                backgroundColor:y.color
            })
            indice=datasets.length-1
        }
        datasets[indice].data[y._mes]=y.cantidad
    })
    return datasets
}

export const MetasProgramadas = () => {
    const [datag, setDatag]=useState({datasets:[],labels:MONTHS})
    const [data_listado, setData_listado] = useState([])

    useEffect(()=>{
        let id_user = (JSON.parse(localStorage.getItem("id_user"))) ? JSON.parse(localStorage.getItem("id_user")) : "";
        conseguirMetaEmpleado(id_user);
    }, []);


    const conseguirMetaEmpleado = async(id)=>{
        await API.get(`api/usuarios/metas/?empleados=${id}`)
        .then( resp =>{
            const datos = resp.data.map((item) =>{
                return {
                    "id":item.id,
                    "_mes":item.mes-1,
                    "color":item.color,
                    "mes": 
                        arreglo_meses.find( el => (
                            el.valor == item.mes
                        )).mes,       
                    "tipoMeta":item.tipoMeta,
                    "estado":item.nombre_estado,
                    "anio": item.anio,
                    "cantidad": item.cantidad
                    }
                
            });
            setDatag({...datag,datasets:mapDatosParaGraficar(datos)})
            setData_listado(datos)
        })
    }
    
    const options = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };

    const showTable = () => {
        return (
            <MDBDataTable
                responsive
                hover
                striped
                small
                paginationLabel={["<", ">"]}
                infoLabel={["Mostrando", "a", "de", "entradas"]}
                className="tabla-pacientes"
                bordered
                entrieslabel={[]}
                data={data}
                noRecordsFoundLabel='No se han encontrado registros'
            />
        )
    }

    const data = {

        columns: [
            {
                label: 'Meta',
                field: 'tipoMeta',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Estado',
                field: 'estado',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Mes',
                field: 'mes',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Año',
                field: 'anio',
                sort: 'asc',
                width: 100
            },

            {
                label: 'Cantidad',
                field: 'cantidad',
                sort: 'asc',
                width: 100
            }
            
        ],
        rows: data_listado

    };

    return (
        <div className="listaRefe">
            <PerfilComponent />
            <HeaderComponent users={false} dashboard={true} />
           <div className='lista-container'>
                <h2 style={{textAlign:'center', marginBottom: "25px", fontSize: '25px' , color: "#02305b"}}>Metas programadas</h2>
                <div style={{marginBottom: '20px', width:'750px'}}>
                    <Bar options={options} data={datag} />
                </div>
                <div style={{width:'750px'}}>
                    {showTable()}
                </div>   
            </div> 
        </div>
    )
}
