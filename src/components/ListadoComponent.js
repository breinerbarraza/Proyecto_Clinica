import React, { useEffect, useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { MDBDataTable } from "mdbreact";
import { PerfilComponent } from "./perfil/PerfilComponent";
import API from "../Utils/API";
import { Link } from "react-router-dom";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import meses_map from "../Utils/Objmeses";
import { formatMoney, calcularComisionFinal } from "../Utils/LogicaFunciones";
import { PerfilComponentSinNombre } from "./perfil/Perfil_sin_nombre";
import "./listaUsuario.css";
import { HeaderMovil } from "./HeaderMovil";
import { Button } from "@mui/material";
import ExportExcel from 'react-export-excel';

const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet 
const ExcelColumn = ExportExcel.ExcelColumn 

export const ListadoComponent = () => {
  const [data_listado, setData_listado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data_meses, setData_meses] = useState([]);
  const [comision, setComision] = useState([]);
  const [state_superUser, setState_superUser] = useState(false);
  const [id_localStorage, setid_localStorage] = useState("");
  const [arreglo_year, setArreglo_year] = useState([]);
  const [anio_temporal, setAnioTemporal] = useState([]);
  const [dataEmpleado, setDataEmpleado] = useState([]);
  const [mes_temporal, setMes_temporal] = useState("");
  const [arreglo_referidos_temporal, setArreglo_referidos_temporal] = useState([]);
  const [cargarIdentificacion, setCargarIdentificacion] = useState([]);
  const [estado_temporal, setEstadoTemporal] = useState("");


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

  const cargarEmpleados = async () => {
    await API.get("api/usuarios/user/grupo_empleado").then((resp) => {
      const respuesta = resp.data;
      setDataEmpleado(respuesta);
    });
  };

  const load = async () => {
    setLoading(true);
    await API.get("api/referidos/").then((resp) => {
      const arreglo_referidos = resp.data;
      setArreglo_referidos_temporal(arreglo_referidos)
      setCargarIdentificacion(arreglo_referidos)
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
              <Link to={`lista/estado/${item.id}`}>
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
              ),
            ordenServicio : item.ordenServicio,
            valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
            comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            total: totalComision,
          },
        ])
      );
    });
    setLoading(false);
  };

  const load_referidos_by_id = async (id_user) => {
    setLoading(true);
    const obj = {
      id: id_user,
    };
    await API.post("api/referidos/get_referidos/", JSON.stringify(obj)).then(
      (resp) => {
        const arreglo_referidos = resp.data;
        setCargarIdentificacion(arreglo_referidos)
        let arreglo = [];
        const filter_arreglo = arreglo_referidos.filter(item => item.finalizado === true)
        const totalComision = calcularComisionFinal(arreglo, filter_arreglo);
        setComision(totalComision);
        arreglo_referidos.map((item) =>
          setData_listado((data_listado) => [
            ...data_listado,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
              total: totalComision,
            },
          ])
        );
      }
    );
    setLoading(false);
  };

  const showTable = () => {
    return (
      //Mostrando 1 a 10 de 12 entradas
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
        noRecordsFoundLabel="No se han encontrado registros"
      />
    );
  };

  useEffect(() => {
    let id_user = JSON.parse(localStorage.getItem("id_user"));
    let super_user = JSON.parse(localStorage.getItem("super_user"))
      ? JSON.parse(localStorage.getItem("super_user"))
      : "";
    setState_superUser(super_user);
    setid_localStorage(id_user);
    cargarEmpleados();
    cargarSelect();
    if (super_user) {
      load();
    } else {
      //comprobarUsuarioAsesor(id_user);
      load_referidos_by_id(id_user);
    }
  }, []);

  const handleSelectMonth_admin = async(e) => {
    setData_meses([]);
    setArreglo_referidos_temporal([]);
    const mes = e.target.value;
    setMes_temporal(mes);
    await API.get(
      `api/referidos/get_referidos_month/?mes=${mes}&anio=${anio_temporal}`
    ).then((data) => {
      const arreglo_referidos_month = data.data;
      setArreglo_referidos_temporal(arreglo_referidos_month)

      const filter_arreglo = arreglo_referidos_month.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(
        arreglo,
        filter_arreglo
      );
      setComision(totalComision);
      if (arreglo_referidos_month.length == 0) {
        setData_meses([0]);
      } else {
        arreglo_referidos_month.map((item) => {
          setData_meses((data_meses) => [
            ...data_meses,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            },
          ]);
        });
      }
    });
  };

  const handleSelectMonth_rol = async (e) => {
    setData_meses([]);
    const mes = e.target.value;
    setMes_temporal(mes);
    await API.get(
      `api/referidos/get_referidos_by_month_rol/?mes=${mes}&id_usuario_logeado=${id_localStorage}&anio=${anio_temporal}`
    ).then((data) => {
      const arreglo_referidos_month = data.data;
      const filter_arreglo = arreglo_referidos_month.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(
        arreglo,
        filter_arreglo
      );
      setComision(totalComision);
      if (arreglo_referidos_month.length == 0) {
        setData_meses([0]);
      } else {
        arreglo_referidos_month.map((item) => {
          setData_meses((data_meses) => [
            ...data_meses,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            },
          ]);
        });
      }
    });
  };

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
      },
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
      },
    ],
    rows: data_listado && data_meses.length == 0 ? data_listado : data_meses,
  };

  const handleYearChange = (e) => {
    const anio = e.target.value;
    setAnioTemporal(anio);
  };

  const handleFilterEmployee = async(e) => {
    const id_empleado = e.target.value;
    setEstadoTemporal(id_empleado)
    setData_meses([]);
    setArreglo_referidos_temporal([])
    await API.get(
      `api/referidos/get_referidos_employee/?mes=${mes_temporal}&anio=${anio_temporal}&id_empleado=${id_empleado}`
    ).then((data) => {
      const arreglo_referidos_month = data.data;
      setArreglo_referidos_temporal(arreglo_referidos_month)
      const filter_arreglo = arreglo_referidos_month.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(
        arreglo,
        filter_arreglo
      );
      setComision(totalComision);
      if (arreglo_referidos_month.length == 0) {
        setData_meses([0]);
      } else {
        arreglo_referidos_month.map((item) => {
          setData_meses((data_meses) => [
            ...data_meses,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            },
          ]);
        });
      }
    });
  };

  const handleSelectCedula = async(e)=>{
    const cedula = e.target.value;
    setData_meses([]);
    setArreglo_referidos_temporal([])
    await API.get(
      `api/referidos/get_referidos_employee/?mes=${mes_temporal}&anio=${anio_temporal}&id_empleado=${estado_temporal}&name_or_cedula=${cedula}`
    ).then((data) => {
      const arreglo_referidos_month = data.data;
      setArreglo_referidos_temporal(arreglo_referidos_month)

      const filter_arreglo = arreglo_referidos_month.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(
        arreglo,
        filter_arreglo
      );
      setComision(totalComision);
      if (arreglo_referidos_month.length == 0) {
        setData_meses([0]);
      } else {
        arreglo_referidos_month.map((item) => {
          setData_meses((data_meses) => [
            ...data_meses,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            },
          ]);
        });
      }
    });
  }

  //Filtrar por cedula cuando es rol
  const handleSelectCedulaRol = async(e)=>{
    const cedula = e.target.value;
    setData_meses([]);
    setArreglo_referidos_temporal([])
    await API.get(
      `api/referidos/get_referidos_by_month_rol/?mes=${mes_temporal}&id_usuario_logeado=${id_localStorage}&anio=${anio_temporal}&name_or_cedula=${cedula}`
    ).then((data) => {
      const arreglo_referidos_month = data.data;
      setArreglo_referidos_temporal(arreglo_referidos_month)

      const filter_arreglo = arreglo_referidos_month.filter(item => item.finalizado === true)
      let arreglo = [];
      const totalComision = calcularComisionFinal(
        arreglo,
        filter_arreglo
      );
      setComision(totalComision);
      if (arreglo_referidos_month.length == 0) {
        setData_meses([0]);
      } else {
        arreglo_referidos_month.map((item) => {
          setData_meses((data_meses) => [
            ...data_meses,
            {
              id: item.id,
              get_nombreCompleto: (
                <Link to={`lista/estado/${item.id}`}>
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
                ),
              ordenServicio : item.ordenServicio,
              valor_cancelado: (item.valor_cancelado ) ? "$" + formatMoney(item.valor_cancelado, 2, ",", ".") : "",
              comision:
              (item.finalizado && item.comisionEmpleadoInicial !== "")
                ? "$" + formatMoney(item.comisionEmpleadoInicial, 2, ",", ".")
                : "-",
            },
          ]);
        });
      }
    });
  }

  return (
    <>
      <div className="listaRefe">
        <PerfilComponent />
        <HeaderComponent users={false} dashboard={true} />

        <div className="lista-container">
          <h3 className="h3-Lista">Listado de referidos</h3>
          {state_superUser && (
              <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
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
                      onChange={handleSelectMonth_admin}
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

                <div className="select-mes">
                  <FormControl fullWidth>
                    <InputLabel shrink id="demo-simple-select-standard-label">
                      Empleados
                    </InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleFilterEmployee}
                    >
                      {dataEmpleado.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.id}>
                            {item.first_name} {item.last_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
                
                <div className="select-mes">
                  <FormControl fullWidth>
                    <InputLabel shrink id="demo-simple-select-standard-label">
                      Cedula
                    </InputLabel>
                    <Select
                      name="name_or_cedula"
                      label="Cedula"
                      id="demo-simple-select-standard"
                      onChange={handleSelectCedula}
                    >
                      {cargarIdentificacion.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.numeroIdentificacion}>
                           {item.numeroIdentificacion}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div style={{width: "20%"}}>
                <ExcelFile element={<Button variant="contained" color="success" class="dw-informe">Descargar informe</Button>} filename="Informe">
                  <ExcelSheet data={arreglo_referidos_temporal} name="Informe de referidos">
                    <ExcelColumn label="Mes" value="mes"/>
                    <ExcelColumn label="Referido" value="get_nombreCompleto"/>
                    <ExcelColumn label="Fecha de ingreso" value="fecha_ingreso" />
                    <ExcelColumn label="Fecha de operado" value="fecha_operado" />
                    <ExcelColumn label="Referido por" value="referido_por" />
                    <ExcelColumn label="Cargo" value="cargo" />
                    <ExcelColumn label="Valor cancelado" value="valor_cancelado" />
                    <ExcelColumn label="Asesor" value="asesor" />
                    <ExcelColumn label="Canal" value="canal" />
                  </ExcelSheet>
                </ExcelFile>
                </div>
               
                
              </div>
          )}








          {/* Si no es superuser y es por tipo de rol */}
          {!state_superUser && (
            <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
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
                    onChange={handleSelectMonth_rol}
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

              <div className="select-mes">
                  <FormControl fullWidth>
                    <InputLabel shrink id="demo-simple-select-standard-label">
                      Cedula
                    </InputLabel>
                    <Select
                      name="name_or_cedula"
                      label="Cedula"
                      id="demo-simple-select-standard"
                      onChange={handleSelectCedulaRol}
                    >
                      {cargarIdentificacion.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.numeroIdentificacion}>
                           {item.numeroIdentificacion}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

            </div>
          )}

          <div className="tabla-lista">{!loading && showTable()}</div>
        </div>
        <div className="div-comision">
          <p className="p-comision">
            <b>Total de comisión: </b>
            <b style={{ color: "#000", fontWeight: "bold" }}>
              ${formatMoney(comision, 2, ",", ".")}
            </b>
          </p>
        </div>
      </div>
      
      
      {/* ******************* responsive design************************** */}
      {/*Listado responsivo*/}

      <div className="listado_referido_responsive">
        <div style={{ padding: "50px", width: "100%" }}>
          <div
            style={{ float: "none", marginTop: "-10px", marginLeft: "190px" }}
          >
            <i>
              <PerfilComponentSinNombre />
            </i>
          </div>

          <div className="lista-container_">
            <h3 className="h3-Lista">Listado de referidos</h3>
            {state_superUser && (
              <div>
              <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
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
                      onChange={handleSelectMonth_admin}
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
                <div className="div-comision_">
                  <p className="p-comision_">
                    <b>Total: </b>
                    <b style={{ color: "#000", fontWeight: "bold" }}>
                      ${formatMoney(comision, 2, ",", ".")}
                    </b>
                  </p>
                  
                </div>
              </div>
              <div className="select-mes" style={{width:"100%"}}>
                  <FormControl fullWidth>
                    <InputLabel shrink id="demo-simple-select-standard-label">
                      Empleados
                    </InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleFilterEmployee}
                    >
                      {dataEmpleado.map((item, key) => {
                        return (
                          <MenuItem key={key} value={item.id}>
                            {item.first_name} {item.last_name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <ExcelFile element={<Button variant="contained" color="success" class="dw-informe">Descargar informe</Button>} filename="Informe">
                  <ExcelSheet data={arreglo_referidos_temporal} name="Informe de referidos">
                    <ExcelColumn label="Mes" value="mes"/>
                    <ExcelColumn label="Referido" value="get_nombreCompleto"/>
                    <ExcelColumn label="Fecha de ingreso" value="fecha_ingreso" />
                    <ExcelColumn label="Fecha de operado" value="fecha_operado" />
                    <ExcelColumn label="Referido por" value="referido_por" />
                    <ExcelColumn label="Cargo" value="cargo" />
                    <ExcelColumn label="Valor cancelado" value="valor_cancelado" />
                    <ExcelColumn label="Asesor" value="asesor" />
                    <ExcelColumn label="Canal" value="canal" />
                  </ExcelSheet>
                </ExcelFile>
                </div>
              
            )}

            {/* Si no es superuser y es por tipo de rol */}
            {!state_superUser && (
              <div style={{ display: "flex", flexDirection: "row", gap: 20 }}>
                <div className="select-mes">
                  <FormControl fullWidth>
                    <InputLabel shrink id="demo-simple-select-standard-label">
                      Mes
                    </InputLabel>
                    <Select
                      name="mes"
                      label="Mes"
                      id="demo-simple-select-standard"
                      onChange={handleSelectMonth_rol}
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
            )}

            <div className="tabla-lista">{!loading && showTable()}</div>
          </div>
        </div>
        {/* FOOTER */}
        <HeaderMovil users={false} dashboard={true} />
      </div>
    </>
  );
};
