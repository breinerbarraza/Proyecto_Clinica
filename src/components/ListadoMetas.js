import React, { useEffect, useState } from 'react'
import { PerfilComponent } from './perfil/PerfilComponent';
import { HeaderComponent } from './HeaderComponent'
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import Chip from '@mui/material/Chip';
import Swal from 'sweetalert2';

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
export const ListadoMetas = () => {

    const [data_listado, setData_listado] = useState([])

    const Metas = async () => {
        await API.get('api/usuarios/metas/')
            .then(resp => {
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
                        "cantidad": item.cantidad,
                        "accion": 
                            <>
                                <button className="btn btn-danger" style={{marginLeft: '4px'}} onClick={() => borrarMeta(item.id)}><i className="fas fa-trash" style={{fontSize:'10px'}}></i></button>
                                <Link to={`actualizar_meta/${item.id}`}><button className="btn btn-primary" style={{marginLeft: '4px'}}><i className='fas fa-edit' style={{fontSize:'10px'}} title={item.id}></i></button></Link>
                            </>
                        }])
                        console.log(data_listado)
                })

            })
    }

    const borrarMeta = (id)=>{
        console.log(id);
        Swal.fire({
            title: 'Estas seguro?',
            text: "Lo puedes cambiar mas adelante!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cambiarlo!'
        }).then(async(result)=>{
            if(result.isConfirmed){
                await API.delete(`api/usuarios/metas/${id}`)
                .then( (data) => {
                    if(data.status == 204){
                        Swal.fire(
                            {
                            icon: 'success',
                            title: 'Exito!',
                            text: "Meta eliminada",
                            showConfirmButton: false,
                            timer: 1500
                            }
                        )
                        setTimeout(()=>{
                            return window.location = "/listado_meta";
                        }, 2000)
                    }
                })
            }else{
                return Swal.fire({
                    icon: 'error',
                    title: 'Mensaje!',
                    text: "Me imagino que tu registro sigue salvo!",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
       
    }

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if(super_user){
            Metas();
        }else{
            window.location='/'
        }
        
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
                <h2 style={{marginBottom: "26px", fontSize: '28px' , color: "#02305b"}}>Listado de Metas</h2>
                <div className="tabla-lista">
                    {showTable()}
                </div>
            </div>
        </div>

    )
}
