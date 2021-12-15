import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useradd from '../image/Recursos-Femto/user-add.svg';
import chart_line_white from '../image/Recursos-Femto/chart-line-up-White.svg';
import { ButtonReferir_change_class, ButtonListar_change_class } from './FuncionesComponent';
import { border } from '@mui/system';

export const HeaderMovil = ({ users, dashboard }) => {

    let estado = users;
    const [imagen, setImagen] = useState(estado); //por defecto es true

    let estado1 = dashboard;
    const [imagen1, setImagen1] = useState(estado1); //por defecto es false

    const handleButtonClick = (e) => {
        setImagen(false);
    }

    const handleButtonClick1 = (e) => {
        setImagen1(true);
    }
    return (
        <>
             <div className="footer-paciente_">
                <div className="footer-header-navbar_">
                    
                {!imagen && (
                        <button style={{border:"none", background:"#10305b", padding:"2px", marginRight:"25px"}} onClick={() => handleButtonClick()}><Link to="/referir"><img alt="clinica" src={useradd}  /></Link></button>
                    )}
                    
                    {imagen && (
                      <>
                      <div
                        style={{
                            width:"5%",
                            backgroundColor: '#FFF',
                            
                            border: "1px solid #f9fafbd1",
                        }}
                      >
                          <div
                          style={{
                            backgroundColor: '#10305b',
                            /* width: "100%", */
                            height: "52px",
                            borderTopRightRadius: "30px",
                            marginRight:"-2px",
                            marginLeft:" -2px",
                          }}
                          />
                      </div>
                      <ButtonReferir_change_class />
                      <div style={{
                                width: "5%",
                                backgroundColor: '#FFF',
                                border: "1px solid #f9fafbd1",
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    /* width: "100%", */
                                    height: "52px",
                                    borderTopLeftRadius: "30px",
                                    marginRight:"-2px",
                                    marginLeft:"-2px",
                                    
                                }} />
                            </div>
                      </>
                    )}
                  {!imagen1 && (
                          <button style={{border:"none", background:"#10305b", padding:"2px", marginLeft:"25px"}} onClick={() => handleButtonClick1()}><Link to="/listado"><img alt="listado_" className="listado_" src={chart_line_white} /></Link></button>
                    )}
                    {imagen1 && (
                        <> 
                       <div
                        style={{
                            width:"5%",
                            backgroundColor: '#FFF',
                            border: "1px solid #f9fafbd1",
                        }}
                      >
                          <div
                          style={{
                            backgroundColor: '#10305b',
                            /* width: "100%", */
                            height: "52px",
                            borderTopRightRadius: "30px",
                            marginRight:"-2px",
                            marginLeft:" -2px",
                          }}
                          />
                      </div>
                        <ButtonListar_change_class /> 
                        <div style={{
                                width: "5%",
                                backgroundColor: '#FFF',
                                border: "1px solid #f9fafbd1",
                            }}>
                                <div style={{
                                    backgroundColor: '#10305b',
                                    /* width: "100%", */
                                    height: "52px",
                                    borderTopLeftRadius: "30px",
                                    marginRight:"-2px",
                                    marginLeft:"-2px",
                                }} />
                            </div>
                        </>
                   )}
                </div>
          </div>
        </>
    )
}
