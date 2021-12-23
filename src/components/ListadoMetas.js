import React, { useEffect, useState } from 'react'
import { PerfilComponent } from './perfil/PerfilComponent';
import { HeaderComponent } from './HeaderComponent'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import Chip from '@mui/material/Chip';

export const ListadoMetas = () => {

    const [data_listado, setData_listado] = useState([])
    const [listado, setListado] = useState([])

    const Metas = async () => {
        await API.get('api/usuarios/metas/')
            .then(resp => {
                const datos = resp.data;
                datos.map((item) =>{
                    setData_listado(data_listado => [...data_listado,{
                        "id":item.id,
                        "mes":item.mes,
                        "tipoMeta":item.tipoMeta,
                        "estado":item.estado,
                        "empleado":item.empleados,
                        "anio": item.anio,
                        "cantidad": item.cantidad,
                        "accion": 
                            <>
                                <button className="btn btn-danger"><i className="fas fa-trash" style={{fontSize:'10px'}}><Link></Link></i></button>
                                <button className="btn btn-primary"><i className='fas fa-edit' style={{fontSize:'10px'}}><Link></Link></i></button>
                            </>
                        }])
                })

            })
    }

    useEffect(() => {
        Metas();
    }, [])


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
            },
            {
                label: 'Accion',
                field: 'accion',
                sort: 'asc',
                width: 100
            },
            
        ],
        rows: data_listado

    };
    return (
        <div className="listaRefe">

            <PerfilComponent />
            <HeaderComponent users={false} dashboard={true} />
            <div className="lista-container">
                <h2 style={{marginBottom: "25px"}}>Listado de Metas</h2>
                <div className="tabla-lista">
                    {showTable()}
                </div>
            </div>
        </div>

    )
}
