import React, { useEffect, useState } from 'react'
import { HeaderComponent } from './HeaderComponent'
import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import { MDBDataTable } from 'mdbreact';
import API from '../Utils/API';
import { PerfilComponent } from './perfil/PerfilComponent';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';

export const ListadoUsuarioComponent = () => {

  const [data_listado, setData_listado] = useState([])
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    await API.get('api/usuarios/user/')
      .then(resp => {
        console.log(resp.data)
        resp.data.map((item) => (
          setData_listado(data_listado => [...data_listado, {
            "id": item.id,
            "nombre_completo": item.nombre_completo,
            "numeroIdentificacion": (item.numeroIdentificacion) ? item.numeroIdentificacion : "Aun no cuenta con identificacion",
            "correo_electronico": item.email,
            "referidos": (item.total_referidos) ? item.total_referidos : 0,
            "QR_Paciente": ( item.qr === null && <Link ><span title="QR Paciente"><i class="fas fa-qrcode" ></i></span></Link>),
            "QR_Asesor": <Link ><span title="QR Asesor"><i class="fas fa-qrcode" ></i></span></Link>,            
          }])
        ))
      })
    setLoading(false)
  }



  const showTable = () => {
    return (
      <MDBDataTable
        striped
        className="tabla-pacientes"
        bordered
        entrieslabel={[]}
        small
        data={data}
      />
    )
  }

  useEffect(() => {
    let super_user = (JSON.parse(localStorage.getItem("super_user"))) ? JSON.parse(localStorage.getItem("super_user")) : "";
    if(super_user){
      load()
    }else{
      window.location = "/";
    }
  }, []);

  console.log(data_listado)

  const data = {

    columns: [
      {

        label: 'Usuario',
        field: "nombre_completo",
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
        label: 'Referidos',
        field: 'referidos',
        sort: 'asc',
        width: 100
      },
      {
        label: 'QR Paciente',
        field: 'QR_Paciente',
        sort: 'asc',
        width: 100
      },
      {
        label: 'QR Asesores',
        field: 'QR_Asesor',
        sort: 'asc',
        width: 100
      },
    ],
    rows: data_listado
   /*  rows: [
      {
        asesor: "Juanpi Pestana",
        numeroIdentificacion: "1042323231231",
        correo_electronico: "juanpiPestana123@gmail.com",
        referido: 20
      },
      {
        asesor: "Breiner Barraza",
        numeroIdentificacion: "1048233213",
        correo_electronico: "barrazabreiner3@gmail.com",
        referido: 15
      },
      {
        asesor: "Andrea Escorcia",
        numeroIdentificacion: "10238992032",
        correo_electronico: "andreaescorcia123@gmail.com",
        referido: 20
      },
      {
        asesor: "Carlos Villagran",
        numeroIdentificacion: "10899232321",
        correo_electronico: "carlos@gmail.com",
        referido: 33
      },
      {
        asesor: "Freyler Manzanilla",
        numeroIdentificacion: "10232313132",
        correo_electronico: "freyler041240@gmail.com",
        referido: 30
      }
    ] */

  };

  return (
    <div className="listaRefe">
      <HeaderComponent users={false} dashboard={true} />
      <PerfilComponent />

      <div className="lista-container">
        <h3 className="h3-Lista">Listado de usuario</h3>
        <div className="subtitle-header">
          <div className="select-mes">
            <TextField
              select
              name="identidad"
              placeholder="Escribe..."
              label="Mes"
              className="form-control "
              style={{ marginBottom: "30px" }}
              onChange={""}
              InputLabelProps={{
                shrink: true,
              }}
            >
              <option value="">Choose one option</option>
            </TextField></div>
            <div style={{flex: 5}}>

            </div>
            <div className="link-crearusuario">
              <Link to="/crear_usuario">
                <button className="btn btn-primary-outline crear-usuario">
                  Crear usuario <img style={{ width: "20%" }} src={user_add_blue} />
                </button>
              </Link>
            </div>
        </div>
        <div className="tabla-lista">
          {!loading && showTable()}
        </div>
      </div>
    </div>

  );
}


