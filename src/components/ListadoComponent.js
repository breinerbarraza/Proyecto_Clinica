import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable  } from 'mdbreact'
import { PerfilComponent } from './perfil/PerfilComponent';
import API from '../Utils/API';
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import meses_map from '../Utils/Objmeses';
import { formatMoney, calcularComisionFinal } from '../Utils/LogicaFunciones';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import './listaUsuario.css';
import { HeaderMovil } from './HeaderMovil';


export const ListadoComponent = () => {
  

  const [data_listado, setData_listado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data_meses, setData_meses] = useState([]);
  const [comision, setComision] = useState([]);
  const [mes_temporal, setMes_temporal] = useState("");
  const [state_superUser, setState_superUser] = useState(false);
  const [id_localStorage, setid_localStorage] = useState("")

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        const arreglo_referidos = resp.data;
        console.log(arreglo_referidos)
        let arreglo = [];
        const totalComision = calcularComisionFinal(arreglo, arreglo_referidos)
        console.log(totalComision)
        setComision(totalComision)

        arreglo_referidos.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{color:'#02305b'}}>Total comisiones: </b>,
            "comision": (item.comision !== "") ? "$" +  formatMoney(item.comision, 2, ',', '.') : "-",
            "total": totalComision
          }])
        ))
      })
    setLoading(false)
  }
  

  const load_referidos_by_id = async(id_user)=>{
    setLoading(true)
    const obj = {
      id: id_user
    }
    await API.post('api/referidos/get_referidos/', JSON.stringify(obj))
      .then(resp => {
        const arreglo_referidos = resp.data;
        let arreglo = [];
        const totalComision = calcularComisionFinal(arreglo, arreglo_referidos)
        setComision(totalComision)
        arreglo_referidos.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{color:'#02305b'}}>Total comisiones: </b>,
            "comision": (item.comision !== "") ? "$" +  formatMoney(item.comision, 2, ',', '.') : "-",
            "total": totalComision
          }])
        ))
      })
    setLoading(false)
  }

  const showTable = () => {
    return (
      //Mostrando 1 a 10 de 12 entradas
      <MDBDataTable 
        hover 
        striped
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        small
        noRecordsFoundLabel='No se han encontrado registros'
        data={data}
        noRecordsFoundLabel='No se han encontrado registros'
      />
    )
  }

  useEffect(() => {
    let id_user = JSON.parse(localStorage.getItem('id_user'));
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    setState_superUser(super_user)
    setid_localStorage(id_user)
    if(super_user){
      load()
    }else{
      load_referidos_by_id(id_user)
    }
  }, []);

  

  
  const handleSelectMonth_admin = (e)=>{
    setData_meses([]);
    const mes = e.target.value
    API.get(`api/referidos/get_referidos_month/?mes=${mes}`)
    .then( data => {
      const arreglo_referidos_month = data.data;
      let arreglo = [];
      const totalComision = calcularComisionFinal(arreglo, arreglo_referidos_month)
      console.log(totalComision)
      setComision(totalComision)
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
            "comision": (item.comision !== "") ? "$" +  formatMoney(item.comision, 2, ',', '.') : "-"
          }]);
        })
      }
    } )
  }

  const handleSelectMonth_rol = async(e)=>{
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes)
    await API.get(`api/referidos/get_referidos_by_month_rol/?mes=${mes}&id_usuario_logeado=${id_localStorage}`)
    .then( data => {
      const arreglo_referidos_month = data.data;
      console.log(arreglo_referidos_month);
      let arreglo = [];
      const totalComision = calcularComisionFinal(arreglo, arreglo_referidos_month)
      console.log(totalComision)
      setComision(totalComision)
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
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : "",
          }]);
        })
      }
    } )
  }

  const data = {
    columns: [
      {

        label: 'Paciente',
        field: 'get_nombreCompleto',
        sort: 'asc',
        width: 150
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
      {
        label: 'Comisión',
        field: 'comision',
        sort: 'asc',
        width: 100
      },
    ],
    rows: (data_listado && data_meses.length == 0) ? data_listado : data_meses
  };
  
 
  return (
    <>
      <div className="listaRefe">
        <PerfilComponent />
        <HeaderComponent users={false} dashboard={true} />

        <div className="lista-container">
          <h3 className="h3-Lista">Listado de referidos</h3>
          {
            state_superUser && (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 20}}>
                <div className="select-mes">

                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleSelectMonth_admin}
                    >
                      {
                        meses_map.map( (item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
            </div>
            )
          } 

          {/* Si no es superuser y es por tipo de rol */}
          {
            !state_superUser &&(
              <div style={{ display: 'flex', flexDirection: 'row', gap: 20}}>
                <div className="select-mes">

                  <FormControl fullWidth  >
                    <InputLabel shrink id="demo-simple-select-standard-label">Mes</InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleSelectMonth_rol}
                    >
                      {
                        meses_map.map( (item, key) => {
                          return <MenuItem key={key} value={item.id}>{item.mes}</MenuItem>
                        })
                      }
                    </Select>
                  </FormControl>
                </div>
            </div>
            )
          }          

          <div className="tabla-lista">
            {!loading && showTable()}
          </div>
        </div>
        <div className='div-comision'>
          <p className='p-comision'><b>Total de comisión: </b><b style={{color:'#000', fontWeight:'bold'}}>${formatMoney(comision, 2, ',', '.')}</b></p>
        </div>
      </div>
      {/*Listado responsivo*/}
      <div>
        
      <div className="listado_referido_responsive">
          <div className="listado_referido_responsive_container">
              <div className="div_perfil_container">
                  <div>
                      <i><PerfilComponentSinNombre/></i>
                  </div>
              </div>
          </div>

          {/* FOOTER */}
         <HeaderMovil  users={false} dashboard={true}/>
      </div>
      </div>
    </>
    
  );
}



