import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import { MDBDataTable } from 'mdbreact'
import { PerfilComponent } from './perfil/PerfilComponent';
import API from '../Utils/API';
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import meses_map from '../Utils/Objmeses';
import { ButtonReferir_change_class, ButtonListar_change_class } from './FuncionesComponent';

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


export const ListadoComponent = () => {

  const [data_listado, setData_listado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [meses, setMeses] = useState([]);
  const [data_meses, setData_meses] = useState([])

  const load = async () => {
    setLoading(true)
    await API.get('api/referidos/')
      .then(resp => {
        const arreglo_referidos = resp.data;
        let arreglo = [];
        for(let x in arreglo_referidos){
          if(arreglo_referidos[x].comision === ""){
            continue;
          }
          arreglo.push(arreglo_referidos[x].comision);
        }
        let total_comision_final = arreglo.join(',');
        total_comision_final = total_comision_final.split(',').map(Number);
        total_comision_final = total_comision_final.reduce((accumulator, curr) => accumulator + curr);
        console.log(total_comision_final);
        const push_obj = {
          "id": "",
          "get_nombreCompleto": "",
          "numeroIdentificacion": "" ,
          "correo_electronico": "",
          "celular": "",
          "estadoReferido": "",
          "comision": total_comision_final
        }
        arreglo_referidos.push(push_obj);
        console.log(arreglo_referidos)
        setMeses(arreglo_referidos)
        arreglo_referidos.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{color:'#02305b'}}>Total comisiones: </b>,
            "comision": (item.comision !== "") ? "$" +  formatMoney(item.comision, 2, ',', '.') : "-"
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
    console.log(obj)
    await API.post('api/referidos/get_referidos/', JSON.stringify(obj))
      .then(resp => {
        const arreglo_referidos = resp.data;
        console.log(arreglo_referidos);
        let arreglo = [];
        for(let x in arreglo_referidos){
          if(arreglo_referidos[x].comision === ""){
            continue;
          }
          let total_comision = arreglo_referidos[x].comision.replace('$', "");
          arreglo.push(total_comision);
        }
        let total_comision_final = arreglo.join(',');
        total_comision_final = total_comision_final.split(',').map(Number);
        total_comision_final = total_comision_final.reduce((accumulator, curr) => accumulator + curr);
        console.log(total_comision_final);
        
        const push_obj = {
          "id": "",
          "get_nombreCompleto": "",
          "numeroIdentificacion": "" ,
          "correo_electronico": "",
          "celular": "",
          "estadoReferido": "",
          "comision": total_comision_final
        }
        arreglo_referidos.push(push_obj);
        console.log(arreglo_referidos)
        setMeses(arreglo_referidos)
        arreglo_referidos.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
            "numeroIdentificacion": item.numeroIdentificacion,
            "correo_electronico": item.correo_electronico,
            "celular": item.celular,
            "estadoReferido": (item.estadoReferido !== "") ? <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} /> : <b style={{color:'#02305b'}}>Total comisiones: </b>,
            "comision": (item.comision !== "") ? "$" +  formatMoney(item.comision, 2, ',', '.') : "-"
          }]),
          console.log(data_listado)
        ))
      })
    setLoading(false)
  }

  const showTable = () => {
    return (
      //Mostrando 1 a 10 de 12 entradas
      <MDBDataTable
        striped
        paginationLabel={["<", ">"]}
        infoLabel={["Mostrando", "a", "de", "entradas"]}
        className="tabla-pacientes"
        bordered
        small
        data={data}
      />
    )
  }

  useEffect(() => {
    let id_user = JSON.parse(localStorage.getItem('id_user'));
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if(super_user){
      load()
    }else{
      load_referidos_by_id(id_user)
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
    const arreglo = [];
    for(let j of obj_nombre){
        if (j != undefined){
          arreglo.push(j)
        }
    }
    let variable = "";
    let dia_mes = "";
    for(let x of arreglo){
      variable = x
      dia_mes = new Date(variable).getMonth() + 1
    }
    if(meses_anio[dia_mes] == mes_nombre){
      const dato = meses.filter(item => item)
      dato.map((item) => (
        setData_meses(data_meses => [...data_meses, {
          "id": item.id,
          "get_nombreCompleto": <Link to={`lista/estado/${item.id}`}>{item.get_nombreCompleto}</Link>,
          "numeroIdentificacion": item.numeroIdentificacion,
          "correo_electronico": item.correo_electronico,
          "celular": item.celular,
          "estadoReferido": <Chip label={`• ${item.estadoReferido}`} style={{ backgroundColor: item.color_estado }} />,
          "comision": item.comision
        }])
      ))
    }else{
      setData_meses(arreglo_vacio)
    }
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
      }
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
            <div style={{ display: 'flex', flexDirection: 'row', gap: 20}}>
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
                      meses_map.map( (item, key) => {
                        return <MenuItem key={key} value={item.mes}>{item.mes}</MenuItem>
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


      {/*Listado responsivo*/}
      <div className="listado_referido_responsive">
          <div className="listado_referido_responsive_container">
              <div className="div_perfil_container">
                  <div>
                      <i><PerfilComponent/></i>
                  </div>
              </div>
          </div>

          {/* FOOTER */}
          <div className="footer-paciente_">
                <div className="footer-header-navbar_">
                    <ButtonReferir_change_class />
                    <ButtonListar_change_class />
                </div>
          </div>
      </div>
    
    </>
    
  );
}



