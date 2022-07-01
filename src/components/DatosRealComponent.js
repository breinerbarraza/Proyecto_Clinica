import React, {useState, useEffect} from 'react'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { MDBDataTable } from 'mdbreact';

import { HeaderComponent } from './HeaderComponent';
import { PerfilComponent } from './perfil/PerfilComponent';

import meses_map from '../Utils/Objmeses';
import API from '../Utils/API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const DatosRealComponent = () => {

  const [datos_reales, setDatos_reales] = useState([])
  const [arreglo_year, setArreglo_year] = useState([])
  const [anioTemporal, setAnioTemporal] = useState("")
  const [id_usuario, setId_usuario] = useState({});
  const [referidos, setReferidos ] = useState({});
  const [gestiones, setGestiones] = useState({});
  const [operaciones, setOperaciones] = useState({});
  const [preqQui, setPreqqui] = useState({});
  const [pendientes, setPendientes] = useState({});
  const [programados, setProgramados] = useState({});

  useEffect(()=>{
    let id_user = (JSON.parse(localStorage.getItem("id_user"))) ? JSON.parse(localStorage.getItem("id_user")) : "";
    setId_usuario({'id_user': id_user})
    cargarSelect()
    conseguirDatosReales(id_user)

  }, []);

  const conseguirDatosReales = async(id_user)=>{
    await API.get(`api/usuarios/metas/meta_empleado/?id_empleado=${id_user}`)
        .then(({data})=> {
            const datos = data.data.map(item=>({
            "referidos":item.referidos,
            "gestiones":item.gestiones,
            "operaciones":item.operaciones,
            'prequirurgicos': item.prequirurgicos,
            'pendientes': item.pendientes,
            'programados': item.programados}
            ));
            setDatos_reales(datos)

            setReferidos(datos[0].referidos)
            setGestiones(datos[0].gestiones)
            setOperaciones(datos[0].operaciones)
            setPreqqui(datos[0].prequirurgicos)
            setPendientes(datos[0].pendientes)
            setProgramados(datos[0].programados)

            
      }).catch(console.error)
  }
  const cargarSelect = () => {
      const fecha = new Date();
      const anio_actual = fecha.getFullYear();
      const arreglo = [];
      for (let x = anio_actual; x >= 1900; x--) {
        const obj = {
          valor: x,
        };
        arreglo.push(obj);
      }
      setArreglo_year(arreglo);
    };
  

  const handleYearChange = (e)=>{
      const anio = e.target.value;
      setAnioTemporal(anio)
  }
  const handleSelectMonth = (e)=>{
      setReferidos({})
      setGestiones({})
      setOperaciones({})
      setPreqqui({})
      setPendientes({})
      setProgramados({})
      setDatos_reales([]);
      const mes = e.target.value;
      API.get(`api/usuarios/metas/meta_empleado/?id_empleado=${id_usuario.id_user}&mes=${mes}&anio=${anioTemporal}`)
      .then(({data})=> {
          const datos = data.data.map(item=>({
          "referidos":item.referidos,
          "gestiones":item.gestiones,
          "operaciones":item.operaciones,
          'prequirurgicos': item.prequirurgicos,
          'pendientes': item.pendientes,
          'programados': item.programados}
          ));
          setDatos_reales(datos)

          setReferidos(datos[0].referidos)
          setGestiones(datos[0].gestiones)
          setOperaciones(datos[0].operaciones)
          setPreqqui(datos[0].prequirurgicos)
          setPendientes(datos[0].pendientes)
          setProgramados(datos[0].programados)
      })
  }
  const data = {
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
  
  const dataReal = {
      labels : ['Referidos', 'Gestiones', 'Operaciones', 'Pre-quirurgicos', 'Pendientes', 'Programados'],
      datasets: [
          {
              label: `Mi progreso`,
              data: [referidos, gestiones, operaciones, preqQui, pendientes, programados],
              backgroundColor: '#826af9',
              tension: 0.7
          }
          
      ]
  };

  return (
    <div className='listaRefe'>
        <PerfilComponent />
        <HeaderComponent users={false} dashboard={true} />

        <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems:'center', marginBottom:'15px', marginTop:'10px', width:'70%', marginLeft:'190px'}}>
          <div className="select-mes">
            <FormControl fullWidth>
              <InputLabel shrink id="demo-simple-select-standard-label">
                Año
              </InputLabel>
              <Select
                name="anio"
                label="Anio"
                id="demo-simple-select-standard"
                onChange={handleYearChange}
              >
                {arreglo_year.map((item, key) => {
                  return (
                    <MenuItem key={key} value={item.valor}>
                      {item.valor}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="select-mes">
              <FormControl fullWidth>
                <InputLabel shrink id="demo-simple-select-standard-label">
                  Mes
                </InputLabel>
                <Select
                  name="mes"
                  label="Mes"
                  id="demo-simple-select-standard"
                  onChange={handleSelectMonth}
                >
                  {meses_map.map((item, key) => {
                    return (
                      <MenuItem key={key} value={item.id}>
                        {item.mes}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
        </div>

        <div className="lista-container" style={{marginTop: '-80px'}}>
            <h2 style={{fontSize: '25px' , color: "#02305b"}}>Mi progreso</h2>
            <div className="tabla-lista">
                <div style={{marginBottom: '20px', width:'680px'}}>
                    <Bar options={options} data={dataReal} />
                </div>
                <div style={{width:'680px', marginTop:'20px'}}>
                    {showTable()}
                </div>  
            </div>
        </div> 
    </div>
  )
}
