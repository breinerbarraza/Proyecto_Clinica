import React, {useEffect, useState} from 'react'
import { HeaderComponent } from './HeaderComponent'
import { PerfilComponent } from './perfil/PerfilComponent';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import API from '../Utils/API';
import Swal from 'sweetalert2';
import { PerfilComponentSinNombre } from './perfil/Perfil_sin_nombre';
import { HeaderMovil } from './HeaderMovil';


export const ReferirComponent = () => {

    let estado1 = true;
    let estado2 = false;
    const [identificacion, setIdentificacion] = useState([]);
    const [canal, setCanal] = useState([]);
    const [select_state, setSelect_state] = useState({});
    const [storage, setstorage] = useState({});
    const [estado_influencer, setEstado_influencer] = useState(false)


    useEffect(() => {
        API.get('api/configuracion/tipoIdentificacion')
            .then(({ data }) => {
                const item = data;
                setIdentificacion(item)
            })

        API.get('api/configuracion/canal/')
            .then(({data}) => {
                const item = data;
                setCanal(item)
            })
    }, []);

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("token"));
        const id_user = JSON.parse(localStorage.getItem("id_user"));
        const objeto = {
            id_user,
            token
        };
        setstorage(objeto);
    }, []);

    const handleSelect = (e) => {
        setSelect_state({
            ...select_state,
            [e.target.name]: e.target.value
        })
    }
    const enviarDatos = async (e) => {
        e.preventDefault();
        select_state.id_user = storage.id_user
        API.post('api/referidos/register-referidos/', JSON.stringify(select_state))
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
            <div className="container-principal">
                <HeaderComponent users={true} dashboard={false}/> 
                <PerfilComponent/>
                <div className="referir-container">
                        <form id="login-form" className="formulario-referir" onSubmit={enviarDatos}>
                            <FormControl fullWidth  >
                                <div className="textfile">
                                    <h3 className="h3-referir"> Referir paciente</h3>
                                    <TextField
                                        type="text"
                                        name="nombres"
                                        placeholder="Escribe..."
                                        label="Nombres"
                                        className="form-control"
                                        required
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleSelect}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        type="text"
                                        name="apellidos"
                                        placeholder="Escribe..."
                                        label="Apellidos"
                                        className="form-control"
                                        required
                                        style={{ marginBottom: "30px" }}
                                        onChange={handleSelect}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />

                                    <TextField
                                            type="number"
                                            name="edad"
                                            placeholder="Escribe..."
                                            label="Edad"
                                            className="form-control"
                                            required
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleSelect}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                   
                                     <TextField
                                            type="text"
                                            name="celular"
                                            placeholder="Escribe..."
                                            label="Celular"
                                            className="form-control"
                                            required
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleSelect}
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
                                                onChange={handleSelect}
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
                                                className= "select-document canal_"
                                                id="demo-simple-select-standard"
                                                onChange={(e,e2)=>{
                                                    if(e2.props.children == "REDES"){
                                                        setEstado_influencer(true)
                                                    }else{
                                                        delete select_state.nombre_influencer
                                                        setEstado_influencer(false)
                                                    }
                                                    handleSelect(e)
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

                                </div>

                                <div className="contenedor-referir">
                                    <div className="documento">
                                        <FormControl fullWidth  >
                                            <InputLabel shrink id="demo-simple-select-standard-label">Tipo de identificacion</InputLabel>
                                            <Select
                                                name="tipoIdentificacion"
                                                label="Tipo de Identificacion"
                                                className= "select-document"
                                                id="demo-simple-select-standard"
                                                onChange={handleSelect}
                                            >
                                                {
                                                    identificacion.map(data => {
                                                        return <MenuItem key={data.id} value={data.id}>{data.descripcion}</MenuItem>
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            type="text"
                                            name="telefono"
                                            placeholder="Escribe..."
                                            label="Telefono"
                                            className="form-control"
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleSelect}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                       
                                    </div>

                                    <div className="container-ce">
                                    <TextField
                                            type="text"
                                            name="numeroIdentificacion"
                                            placeholder="Escribe..."
                                            label="N°.Identificacion"
                                            className="form-control"
                                            style={{ marginBottom: "33px" }}
                                            onChange={handleSelect}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        
                                        <TextField
                                            type="email"
                                            name="correo_electronico"
                                            placeholder="Escribe..."
                                            label="Email"
                                            className="form-control"
                                            style={{ marginBottom: "30px" }}
                                            onChange={handleSelect}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                        <button style={{ "marginTop": "20px" }} type="submit">Referir</button>
                                    </div>
                                </div>
                            </FormControl>
                        </form>
                </div>
            </div>



            {/* ****************************************************** */}
            {/* Contenido responsive */}
            <div className="container-responsive-referir">
                <div className="div_perfil" style={{padding:"10px"}}>
                    <div>
                        <b style={{padding:"5px", marginTop:"10px"}}>Referir Paciente</b>
                    </div>
                    <div >
                        <i><PerfilComponentSinNombre/></i>
                    </div>
                </div>
                <div className="div-formulario-referir">
                    <form id="login-form" onSubmit={enviarDatos}>
                        <div className="div-separador">
                            <TextField
                                type="text"
                                name="nombres"
                                placeholder="Escribe..."
                                label="Nombres"
                                className="form-control"
                                required
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
        
                        </div>

                        <TextField
                            type="text"
                            name="apellidos"
                            placeholder="Escribe..."
                            label="Apellidos"
                            className="form-control"
                            required
                            style={{ marginBottom: "30px" }}
                            onChange={handleSelect}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />  

                        <TextField
                            type="number"
                            name="edad"
                            placeholder="Escribe..."
                            label="Edad"
                            className="form-control"
                            required
                            style={{ marginBottom: "30px" }}
                            onChange={handleSelect}
                            InputLabelProps={{
                                shrink: true,
                            }}
                         />
            
                    <TextField
                        type="text"
                        name="celular"
                        placeholder="Escribe..."
                        label="Celular"
                        className="form-control"
                        required
                        style={{ marginBottom: "30px" }}
                        onChange={handleSelect}
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
                            onChange={handleSelect}
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
                                    delete select_state.nombre_influencer
                                    setEstado_influencer(false)
                                }
                                handleSelect(e)
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
                        
                    <div className='div-separador-identificacion'>
                        <FormControl fullWidth  >
                                <InputLabel shrink id="demo-simple-select-standard-label">Tipo de identificacion</InputLabel>
                                <Select
                                    name="tipoIdentificacion"
                                    label="Tipo de Indentificacion"
                                    className= "select-document"
                                    id="demo-simple-select-standard"
                                    onChange={handleSelect}
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
                                    name="numeroIdentificacion"
                                    placeholder="Escribe..."
                                    label="N°.Identificacion"
                                    className="form-control"
                                    style={{ marginBottom: "33px" }}
                                    onChange={handleSelect}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                            />
                        
                            <TextField
                                type="text"
                                name="telefono"
                                placeholder="Escribe..."
                                label="Telefono"
                                className="form-control"
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <TextField
                                type="email"
                                name="correo_electronico"
                                placeholder="Escribe..."
                                label="Email"
                                className="form-control"
                                required
                                style={{ marginBottom: "30px" }}
                                onChange={handleSelect}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        <button className="btn-referir-paciente" type="submit">Referir</button>
                    </form>                                            
                </div >
                {/* FOOTER */}
                <HeaderMovil users={true} dashboard={false} style={{position:"absolute"}}/>
            </div>    
        </>
    )
}
