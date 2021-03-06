import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import logo_clinica from '../image/Recursos-Femto/Logo Clinica.svg';
import liberate from '../image/Recursos-Femto/Liberate.png';
import Swal from 'sweetalert2';
import API from '../Utils/API';
import { RegistrarReferidoMedia } from './componentMediaQuery/RegistrarReferidoMedia';

export const RegistrarReferidoComponent = () => {

    const [identificacion, setIdentificacion] = useState([]);
    const [canal, setCanal] = useState([]);
    const [state_referido, setState_referido] = useState([]);
    const [estadoBoleano, setestadoBoleano] = useState(true);
    const [estadoForm, setEstadoForm] = useState(false);
    const [estado_influencer, setEstado_influencer] = useState(false)
    const {id} = useParams();

    useEffect(() => {
        tipoIdentificacion()
        tipoCanal()
    }, []);


    const tipoIdentificacion = async()=>{
       await API.get('api/configuracion/tipoIdentificacion')
            .then(({ data }) => {
                const item = data;
                setIdentificacion(item)
            })
    }

    const tipoCanal = async()=>{
        await API.get('api/configuracion/canal/')
        .then(({data}) => {
            const item = data;
            setCanal(item)
        })
    }

    const handleChangeState = ()=>{
        setestadoBoleano(false);
        setEstadoForm(true);
    }

    const handleInput = (e) => {
        setState_referido({
            ...state_referido,
            [e.target.name]: e.target.value,
            id_user: (id) ? id : 0
        })
    }
    const enviarDatos = async(e) => {
        e.preventDefault();
        await API.post('api/referidos/register-referidos/', JSON.stringify(state_referido))
            .then(item => {
                const resp = item.data;
                document.getElementById("login-form").reset();
                if (resp.mensaje) {
                    return Swal.fire({
                        icon: 'success',
                        text: resp.mensaje,
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    return Swal.fire({
                        icon: 'error',
                        text: resp.error,
                        position: 'center',
                    })
                }
            })
    }

    return (
        <>
        {
            estadoBoleano && (
                <RegistrarReferidoMedia cambiarEstado = {handleChangeState} />
            )
        }

        {estadoForm && (
            <>
             <div className="div-container">
                <div className="contenedor-div">
                    <h3 className="h3-referir">??Est??s ingresando tus datos para ser un candidato para librarte de tus gafas!</h3>
                </div>
             <form onSubmit={enviarDatos} className="form-referir">
                 <TextField
                     type="text"
                     name="nombres"
                     placeholder="Escribe..."
                     label="Nombres"
                     required
                     className="form-control"
                     style={{ marginBottom: "30px" }}
                     onChange={handleInput}
                     InputLabelProps={{
                         shrink: true,
                     }}
                 />
                 <div className="div-separador">
                     <TextField
                         type="text"
                         name="apellidos"
                         placeholder="Escribe..."
                         label="Apellidos"
                         required
                         className="form-control RegistrarReferido"
                         style={{ marginBottom: "30px" }}
                         onChange={handleInput}
                         InputLabelProps={{
                             shrink: true,
                         }}
                     />
               </div>

               <div className="div-separador">
                     <TextField
                     type="text"
                     name="edad"
                     placeholder="Escribe..."
                     label="Edad"
                     required
                     className="form-control RegistrarReferido"
                     style={{marginBottom: "30px"}}
                     onChange={handleInput}
                     InputLabelProps={{
                         shrink: true,
                     }}
                     />
                 </div>
            
               <div className="div-separador">
                     <TextField
                     type="text"
                     name="celular"
                     placeholder="Escribe..."
                     label="Celular"
                     required
                     className="form-control RegistrarReferido"
                     style={{marginBottom: "30px"}}
                     onChange={handleInput}
                     InputLabelProps={{
                         shrink: true,
                     }}
                     />
                 </div>
                 {
                    estado_influencer && (
                       <div className="div-separador">
                            <TextField
                                type="text"
                                name="nombre_influencer"
                                placeholder="Escribe..."
                                label="Nombre influencer"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                onChange={handleInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                       </div>
                    )
                }

                <di className="div-separador">
                    <FormControl fullWidth className='canal'>
                        <InputLabel shrink id="demo-simple-select-standard-label">Tipo de canal</InputLabel>
                        <Select
                            name="canal"
                            label="Tipo de Canal"
                            className= "select-document"
                            id="demo-simple-select-standard"
                            onChange={(e,e2)=>{
                                if(e2.props.children == "REDES"){
                                    setEstado_influencer(true)
                                }else{
                                    delete state_referido.nombre_influencer
                                    setEstado_influencer(false)
                                }
                                handleInput(e)
                            }}
                            required
                            
                        >
                            {
                                canal.map(data => {
                                    return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
               </di>

               <div className="div-separador-identificacion">
                  
                 <FormControl fullWidth  >
                         <InputLabel shrink id="demo-simple-select-standard-label">Tipo de identificacion</InputLabel>
                         <Select
                             name="tipoIdentificacion"
                             label="Tipo de Identificacion"
                             id="demo-simple-select-standard"
                             className=""
                             style={{ marginBottom: "-4px"}}
                             onChange={handleInput}
                             options={
                                identificacion.map(data => {
                                    return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                })
                             }
                         >
                             {
                                 identificacion.map(data => {
                                     return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                 })
                             }
                         </Select>
                 </FormControl>
               </div>
                 <div className="div-separador" style={{ marginTop:'-0.5px' }}>
                 <TextField
                     type="text"
                     name="numeroIdentificacion"
                     placeholder="Escribe..."
                     label="N??.Identificacion"
                     className="form-control RegistrarReferido"
                     style={{ marginBottom: "30px" }}
                     onChange={handleInput}
                     InputLabelProps={{
                         shrink: true,
                     }}
                 />
                 </div>                                
                
                 <div className="div-separador">
                    
                 </div>
 
                 <div className="div-separador">
                     <TextField
                     type="text"
                     name="telefono"
                     placeholder="Escribe..."
                     label="Telefono"
                     className="form-control RegistrarReferido"
                     style={{marginBottom: "30px"}}
                     onChange={handleInput}
                     InputLabelProps={{
                         shrink: true,
                     }}
                     />
                 </div>
                 <div className="div-separador">
                     <TextField
                         type="email"
                         name="correo_electronico"
                         placeholder="Escribe..."
                         label="Email"
                         required
                         className="form-control RegistrarReferido"
                         style={{ marginBottom: "30px" }}
                         onChange={handleInput}
                         InputLabelProps={{
                             shrink: true,
                         }}
                 />
                 </div>       
 
                 <div className="form-submit">
                     <button type="submit" className="btn btn-primary btn-referir">Enviar</button>
                 </div>
             </form>
         </div>

         

         {/* Dise??o pc ********************* */}
         <div className="page-registrarefe">
             <div className="registrarefe-container">
                 <div className="formulario-registrarefe">
                     <form onSubmit={enviarDatos} className="_form-registro" id="login-form">
                         <div className="msg">
                         <img alt="clinica" className="logo_clinica-registrarefe" src={logo_clinica} />
                             <h3 className="h3-registrarefe">??Hola,</h3>
                             <p className="p-registrarefe">a continuaci??n ingresar??s tus datos para ser un candidato m??s y liberarte de tus gafas! </p>
                         </div>
                         <TextField
                             type="text"
                             name="nombres"
                             placeholder="Escribe..."
                             label="Nombres"
                             required
                             className="form-control"
                             style={{ marginBottom: "30px" }}
                             onChange={handleInput}
                             InputLabelProps={{
                                 shrink: true,
                             }}
                         />
                         <TextField
                             type="text"
                             name="apellidos"
                             placeholder="Escribe..."
                             label="Apellidos"
                             required
                             className="form-control RegistrarReferido"
                             style={{ marginBottom: "30px" }}
                             onChange={handleInput}
                             InputLabelProps={{
                                 shrink: true,
                             }}
                         />

                        <TextField
                             type="text"
                             name="edad"
                             placeholder="Escribe..."
                             label="Edad"
                             required
                             className="form-control RegistrarReferido"
                             style={{ marginBottom: "30px" }}
                             onChange={handleInput}
                             InputLabelProps={{
                                 shrink: true,
                             }}
                         />

                        <TextField
                             type="text"
                             name="celular"
                             placeholder="Escribe..."
                             label="Celular"
                             required
                             className="form-control RegistrarReferido"
                             style={{ marginBottom: "30px" }}
                             onChange={handleInput}
                             InputLabelProps={{
                                 shrink: true,
                             }}
                         />

                        {
                            estado_influencer && (
                                <TextField
                                type="text"
                                name="nombre_influencer"
                                placeholder="Escribe..."
                                label="Nombre influencer"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                onChange={handleInput}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                />
                            )
                        }

                        <FormControl fullWidth className='canal'>
                            <InputLabel shrink id="demo-simple-select-standard-label">Tipo de canal</InputLabel>
                            <Select
                                name="canal"
                                label="Tipo de Canal"
                                className= "select-document"
                                id="demo-simple-select-standard"
                                onChange={(e,e2)=>{
                                    if(e2.props.children == "REDES"){
                                        setEstado_influencer(true)
                                    }else{
                                        delete state_referido.nombre_influencer
                                        setEstado_influencer(false)
                                    }
                                    handleInput(e)
                                }}
                                required
                                
                            >
                                {
                                    canal.map(data => {
                                        return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
                        
                         <div className="_container-referidos">
                             <div className="container-Select-cedula">
                                 <div className="select">
                                     <FormControl fullWidth  >
                                         <InputLabel shrink id="demo-simple-select-standard-label">Tipo de Identificacion</InputLabel>
                                         <Select
                                             name="tipoIdentificacion"
                                             label="Tipo de Indentificacion"
                                             id="demo-simple-select-standard"
                                             style={{ marginBottom: "-4px" }}
                                             onChange={handleInput}
                                         >
                                             {
                                                 identificacion.map(data => {
                                                     return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                                 })
                                             }
                                         </Select>
                                     </FormControl>
                                 </div>
                                 <TextField
                                     type="text"
                                     name="telefono"
                                     placeholder="Escribe..."
                                     label="Telefono"
                                     className="form-control RegistrarReferido"
                                     style={{marginBottom: "30px"}}
                                     onChange={handleInput}
                                     InputLabelProps={{
                                         shrink: true,
                                     }}
                                 />
                             </div>
                             <div className="container-identidad-email">
                                 <TextField
                                     type="text"
                                     name="numeroIdentificacion"
                                     placeholder="Escribe..."
                                     label="N??.Identificacion"
                                     className="form-control RegistrarReferido"
                                     style={{ marginBottom: "30px" }}
                                     onChange={handleInput}
                                     InputLabelProps={{
                                         shrink: true,
                                     }}
                                 />
                                 <TextField
                                     type="email"
                                     name="correo_electronico"
                                     placeholder="Escribe..."
                                     label="Email"
                                     className="form-control RegistrarReferido"
                                     style={{ marginBottom: "30px" }}
                                     onChange={handleInput}
                                     InputLabelProps={{
                                         shrink: true,
                                     }}
                                 />
                             </div>
                         </div>
                         <button type="submit" className="btn btn-primary">REGISTRARSE</button>
                     </form>
                 </div>
                 <div className="container-logo-registrarefe msg">
                     <div className="logo-registrarefe">
                         <img alt="clinica" src={liberate} />
                     </div>
                 </div>
             </div>
         </div>
         </>
        )}
    </>
    )
}

