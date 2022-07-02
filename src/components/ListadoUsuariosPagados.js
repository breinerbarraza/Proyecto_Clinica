import React, { useState, useEffect } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { PerfilComponent } from './perfil/PerfilComponent'
import { MDBDataTable } from 'mdbreact'
import API from '../Utils/API'
import { formatMoney } from '../Utils/LogicaFunciones'


export const ListadoUsuariosPagados = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
        if (super_user) {
            load()
        } else {
            window.location = "/";
        }
    }, []);

const load = async()=>{
    setLoading(true)
    await API.get('api/usuarios/pagos/')
    .then(({data})=>{
        data.map((item)=>(
            setData(data => [...data, {
                "id": item.id,
                "id_usuario": item.fk_user.id,
                "nombre_completo": item.fk_user.nombre_completo,
                "numero_pacientes": item.numero_pacientes,
                "valor_total": "$" + formatMoney(item.valor_total, 2, ",", "."),
                "fecha_consignacion": item.fecha_creacion,
            }])
        ))
    }) 
    .catch(console.error)
    setLoading(false)
}

const dataTab = {

    columns: [
      {
        label: 'Nombre completo',
        field: "nombre_completo",
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Numero de pacientes',
        field: 'numero_pacientes',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Valor',
        field: 'valor_total',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Fecha consignacion',
        field: 'fecha_consignacion',
        sort: 'asc',
        width: 100
      }
    ],
    rows: data
  };

const showTable = () => {
    return (
        <MDBDataTable
        hover
        responsive
        striped
        small
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        data={dataTab}
        noRecordsFoundLabel='No se han encontrado registros'
        />
    )
    }


  return (
    <div className='listaRefe'>
        <HeaderComponent users={false} dashboard={true} />
        <PerfilComponent />

        <div className="lista-container">
            <h3 style={{marginBottom: '28px'}}>Listado de usuarios pagados</h3>

            <div className="tabla-lista">
                {!loading && showTable()}
            </div>
        </div>

    </div>
  )
}
