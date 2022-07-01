import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { HeaderComponent } from './HeaderComponent';
import { PerfilComponent } from './perfil/PerfilComponent';
import { formatMoney, calcularComisionFinal } from "../Utils/LogicaFunciones";
import Chip from "@mui/material/Chip";
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';

export const DashboardEstado = () => {
 
  const [loading, setLoading] = useState(false)
  const [data_listado, setData_listado] = useState([])
  const [arreglo_referidos_temporal, setArreglo_referidos_temporal] = useState([])
  const [comision, setComision] = useState([])
  const { estado } = useParams();


  useEffect(() => {
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if (super_user) {
      load(estado)
    } else {
      window.location = "/";
    }
  }, [])

  const load = async (estado_referido) => {
    setLoading(true);
    await API.get("api/referidos/?estado="+estado_referido).then((resp) => {
      const arreglo_referidos = resp.data;
      setArreglo_referidos_temporal(arreglo_referidos)
      const filter_arreglo = arreglo_referidos.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(arreglo, filter_arreglo);
      setComision(totalComision);

      arreglo_referidos.map((item) =>
        setData_listado((data_listado) => [
          ...data_listado,
          {
            id: item.id,
            get_nombreCompleto: (
              <Link to={`/lista/estado/${item.id}`}>
                {item.get_nombreCompleto}
              </Link>
            ),
            numeroIdentificacion: item.numeroIdentificacion,
            correo_electronico: item.correo_electronico,
            celular: item.celular,
            estadoReferido:
              item.estadoReferido !== "" ? (
                <Chip
                  label={`• ${item.estadoReferido}`}
                  style={{ backgroundColor: item.color_estado }}
                />
              ) : (
                <b style={{ color: "#02305b" }}>Total comisiones: </b>
              )/* ,
            ordenServicio : item.ordenServicio,
            valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
            comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            total: totalComision, */
          },
        ])
      );
    });
    setLoading(false);
  }
  

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
        data={data}
        noRecordsFoundLabel='No se han encontrado registros'
      />
    )
  }

  const data = {
    columns: [
      {
        label: "Paciente",
        field: "get_nombreCompleto",
        sort: "asc",
        width: 150,
      },
      {
        label: "Documento de identidad",
        field: "numeroIdentificacion",
        sort: "asc",
        width: 270,
      },
      {
        label: "Correo",
        field: "correo_electronico",
        sort: "asc",
        width: 200,
      },
      {
        label: "Celular",
        field: "celular",
        sort: "asc",
        width: 100,
      },
      {
        label: "Estado",
        field: "estadoReferido",
        sort: "asc",
        width: 150,
      }/* ,
      {
        label: "N° Orden",
        field: "ordenServicio",
        sort: "asc",
        width: 100,
      },
      {
        label: "Valor cancelado",
        field: "valor_cancelado",
        sort: "asc",
        width: 100,
      },
      {
        label: "Comisión",
        field: "comision",
        sort: "asc",
        width: 100,
      }, */
    ],
    rows: data_listado
  };
  
    
  return (
    <>
        <div className="dash">
            <HeaderComponent dashboard />
            <PerfilComponent />
          <div className="lista-container">
            <h4 className="h3-Lista">Listado de referidos del estado <em>{estado}</em> </h4>
                <div className="tabla-lista">
                    {!loading && showTable()}
                </div>
            </div>
        </div>

        
    </>
  )
}
