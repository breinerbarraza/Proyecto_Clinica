import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact';
import Chip from '@mui/material/Chip';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom'
import meses_map from '../Utils/Objmeses';
export const ListadoReferidoComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)
  const [cmb_listado, setCmb_listado] = useState([]);
  const [meses, setMeses] = useState([]);
  const [data_meses, setData_meses] = useState([]);
  const [mes_temporal, setMes_temporal] = useState("");

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        setMeses(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
          }])
        ))
      })
    setLoading(false)
  }

  const load_referidos_by_id = async (id_user) => {
    alert("xdd")
    setLoading(true)
    const obj = {
      id: id_user
    }
    console.log(obj)
    await API.post('api/referidos/get_referidos/', JSON.stringify(obj))
      .then(resp => {
        setMeses(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
          }]),
          console.log(data_listado)
        ))
      })
    setLoading(false)
  }

  const cargarEstados = async () => {
    await API.get('api/configuracion/estadoReferido/')
      .then(data => {
        const resp = data.data;
        setCmb_listado(resp)
      })
      .catch(console.error);
  }

  const showTable = () => {
    return (
      <MDBDataTable
        striped
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        small
        data={data}
      />
    )
  }
  useEffect(() => {
    let id_user = JSON.parse(localStorage.getItem('id_user'));
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if (super_user) {
      load()
    } else {
      load_referidos_by_id(id_user)
    }
    cargarEstados()
  }, []);


  const handleSelectMonth = (e) => {
    
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes)
    API.get(`api/referidos/get_referidos_month/?mes=${mes}`)
    .then( data => {
      const arreglo_referidos_month = data.data;
      console.log(arreglo_referidos_month);
      if(arreglo_referidos_month.length == 0){
        setData_meses([0]);
      }else{
        arreglo_referidos_month.map((item)=>{
          setData_meses(data_meses => [...data_meses, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{color:'#02305b'}}>Total comisiones: </b>,
          }]);
        })
      }
    } )



    }

  const handleSelectEstate = async(e) => {
    setData_meses([]);
    const id_estado = e.target.value;
    console.log(mes_temporal)
    console.log(id_estado)
    await API.get(`api/referidos/get_referidos_estado/?mes=${mes_temporal}&id_estado=${id_estado}`)
      .then( data => {
        const respuesta = data.data;
        console.log(respuesta);
        if(respuesta.length > 0){
          respuesta.map((item) => (
            setData_meses(data_meses => [...data_meses, {
              "id": item.id,
              "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
              "numeroIdentificacion": item.numeroIdentificacion,
              "correo_electronico": item.correo_electronico,
              "celular": item.celular,
              "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />
            }])
          ))
        }else{
          console.log("No hay nada que mostrar");
          setData_meses([0]);
        }
     
    })
    
   

  }

  const data = {

    columns: [
      {
        label: 'Paciente',
        field: "get_nombreCompleto",
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Documento de identidad',
        field: 'numeroIdentificacion',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Correo',
        field: 'correo_electronico',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Celular',
        field: 'celular',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Estado',
        field: 'estadoReferido',
        sort: 'asc',
        width: 150
      },
    ],
    rows: ((data_listado && data_meses.length == 0)) ? data_listado : data_meses

  };

  return (
    <div className="listaRefe">
      <PerfilComponent />
      <HeaderComponent users={false} dashboard={true} />

      <div className="lista-container">
        <h3 className="h3-Lista">Listado de referidos</h3>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 20
        }}>
          <div className="select-mes">

            <FormControl fullWidth  >
              <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
              <Select
                name="mes"
                label="Mes"
                id="demo-simple-select-standard"
                onChange={handleSelectMonth}
              >
                {
                  meses_map.map((item, key) => {
                    return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </div>
          <div className="select-mes">
            <FormControl fullWidth  >
              <InputLabel shrink id="demo-simple-select-standard-label">Estado</InputLabel>
              <Select
                name="estado"
                label="Estado"
                id="demo-simple-select-standard"
                onChange={handleSelectEstate}
              >
                {
                  cmb_listado.map((item, key) => {
                    return <MenuItem key={key} value={item.id}>{item.descripcion}</MenuItem>
                  })

                }
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="tabla-lista">
          {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


