import { MDBDataTable } from 'mdbreact';
import React, { useEffect, useState } from 'react'
import API from '../Utils/API';
import { HeaderComponent } from './HeaderComponent';
import { PerfilComponent } from './perfil/PerfilComponent';

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

export const MetasProgramadas = () => {

    const [data_listado, setData_listado] = useState([])
    const [datos_reales, setDatos_reales] = useState([])

    const conseguirMetaEmpleado = async(id)=>{
        await API.get(`api/usuarios/metas/?empleados=${id}`)
        .then( resp =>{
            const datos = resp.data;
            datos.map((item) =>{
                setData_listado(data_listado => [...data_listado,{
                    "id":item.id,
                    /* "mes":item.mes, */
                    "mes": 
                        arreglo_meses.filter( el => (
                            el.valor == item.mes
                        ))
                        .map( item =>  {
                            return item.mes
                        }),       
                    "tipoMeta":item.tipoMeta,
                    "estado":item.nombre_estado,
                    "empleado":item.empleado,
                    "anio": item.anio,
                    "cantidad": item.cantidad
                    }])
                
            })
        })
    }

    useEffect(()=>{
        let id_user = (JSON.parse(localStorage.getItem("id_user"))) ? JSON.parse(localStorage.getItem("id_user")) : "";
        conseguirMetaEmpleado(id_user);

        API.get(`api/usuarios/metas/meta_empleado/?id_empleado=${id_user}`)
        .then(({data})=> {
            const datos = data;
            console.log(datos.data)
            datos.data.map((item) =>{
                setDatos_reales(datos_reales => [...datos_reales,{    
                    "referidos":item.referidos,
                    "gestiones":item.gestiones,
                    "operaciones":item.operaciones,
                    'prequirurgicos': item.prequirurgicos,
                    'pendientes': item.pendientes,
                    'programados': item.programados
                    }])
                
            })
        })

    }, []);


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

    
    const showTable2 = () => {
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
                data={data2}
                noRecordsFoundLabel='No se han encontrado registros'
            />
        )
    }


    const data = {

        columns: [
            {
                label: 'Empleado',
                field: "empleado",
                sort: 'asc',
                width: 150,
            },
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

    const data2 = {

        columns: [
            {
                label: 'Referidos',
                field: "referidos",
                sort: 'asc',
                width: 150,
            },
            {
                label: 'Gestiones',
                field: 'gestiones',
                sort: 'asc',
                width: 270
            },
            {
                label: 'Operaciones',
                field: 'operaciones',
                sort: 'asc',
                width: 200
            },
            {
                label: 'Prequirurgicos',
                field: 'prequirurgicos',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Pendientes',
                field: 'pendientes',
                sort: 'asc',
                width: 100
            },

            {
                label: 'Programados',
                field: 'programados',
                sort: 'asc',
                width: 100
            }
            
        ],
        rows: datos_reales

    };

    return (
        <div className="listaRefe">
            <PerfilComponent />
            <HeaderComponent users={false} dashboard={true} />
           <div className='lista-container'>
                <h2 style={{marginBottom: "26px", fontSize: '28px' , color: "#02305b"}}>Metas programadas</h2>
                    <div className="tabla-lista">
                        {showTable()}
                    </div>   
            </div> 

        <div className="lista-container" style={{marginTop: '-80px'}}>
            <h2 style={{marginBottom: "26px", fontSize: '28px' , color: "#02305b"}}>Datos reales</h2>
            <div className="tabla-lista">
            {showTable2()}
            </div>
        </div>        
            
        </div>
    )
}
