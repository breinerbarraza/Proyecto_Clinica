import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

}from 'react-router-dom'
import { LoginComponent } from "./components/LoginComponent";
//import { HeaderComponent } from "./components/HeaderComponent";
import { RegistroComponent } from './components/RegistroComponent';
import { ReferirComponent } from './components/ReferirComponent';
import { ListadoComponent } from './components/ListadoComponent';
import { ConfirEmailComponent } from "./components/ConfirEmailComponent";
import { RegistrarReferidoComponent } from './components/RegistrarReferidoComponent';
import { DashboardComponent } from './components/DashboardComponent';
import { CrearUsuarioComponent } from './components/CrearUsuarioComponent';
import { ListadoReferidoComponent } from './components/ListadoReferidoComponent';
import { EstadoComponent } from './components/ComponetEstados/EstadoComponent';
import { DatosPerfilComonent } from './components/perfil/DatosPerfilComonent';
import { ListadoUsuarioComponent } from './components/ListadoUsuarioComponent';
import { CambioContraseña } from './components/perfil/CambioContraseña';
import { Dashboard2Component } from './components/Dashboard2Component';
import { RegistrarReferidoMedia } from './components/componentMediaQuery/RegistrarReferidoMedia';

import { HeaderMovil } from './components/HeaderMovil';
import { ComponentModalMetas } from './components/ComponentModalMetas';
import { ListadoMetas } from './components/ListadoMetas';
//import { ComponentModalStateMetas } from './components/ComponentModalStateMetas';
import { ActualizarMetaModal } from './components/ActulizarMetaModal';
import { MetasProgramadas } from './components/MetasProgramadas';
import { DashboardComponentCanal } from './components/DashboardComponentCanal';
import { TablaSolicitudes } from './components/TablaSolicitudes';
import { ActualizarReferido } from './components/ActualizarReferido';
import { Registro } from './components/Registro';
import { DashboardEstado } from './components/DashboardEstado';
import { DatosRealComponent } from './components/DatosRealComponent';
import { PagoComponent } from './components/PagoComponent';
import { ListadoUsuariosPagados } from './components/ListadoUsuariosPagados'


function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/">
              {localStorage.getItem('token') !== null ? (
                <ListadoReferidoComponent />
              ) : (
                <LoginComponent />
              )}
            </Route>
            
            <Route exact path="/registro/:id">
              {
                (localStorage.getItem('token') !== null)
                ? <ListadoComponent />
                : <RegistroComponent />
              }
            </Route>

            <Route exact path="/registro">
              {
                (localStorage.getItem('token') !== null)
                ? <ListadoComponent />
                : <Registro />
              }
            </Route>

              <Route exact path="/listado">
                {localStorage.getItem('token') !== null ? (
                  <ListadoComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/actualizar_referido/:id">
                {localStorage.getItem('token') !== null ? (
                  <ActualizarReferido />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/actualizar_meta/:id">
                {localStorage.getItem('token') !== null ? (
                  <ActualizarMetaModal />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/listado_meta">
                {localStorage.getItem('token') !== null ? (
                  <ListadoMetas />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/metas_programadas">
                {localStorage.getItem('token') !== null ? (
                  <MetasProgramadas />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/mi_progeso">
                {localStorage.getItem('token') !== null ? (
                  <DatosRealComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/email">
                  <ConfirEmailComponent />
            
              </Route>
              <Route exact path="/referir">
                {localStorage.getItem('token') !== null ? (
                  <ReferirComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/dashboard">
                {localStorage.getItem('token') !== null ? (
                  <DashboardComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/dashboard/:estado">
                {localStorage.getItem('token') !== null ? (
                  <DashboardEstado />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/dashboard2">
                {localStorage.getItem('token') !== null ? (
                  <Dashboard2Component/>
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/dashboardMeta">
                {localStorage.getItem('token') !== null ? (
                  <DashboardComponentCanal/>
                ) : (
                  <LoginComponent />
                )}
              </Route>

              <Route exact path="/add_metas">
                {localStorage.getItem('token') !== null ? (
                  <ComponentModalMetas/>
                ) : (
                  <LoginComponent />
                )}
              </Route>

              {/* <Route exact path="/add_metas_estate">
                {localStorage.getItem('token') !== null ? (
                  <ComponentModalStateMetas/>
                ) : (
                  <LoginComponent />
                )}
              </Route> */}

              <Route exact path="/tabla-solicitudes">
                  {localStorage.getItem('token') !== null ? (
                    <TablaSolicitudes />
                  ): (
                    <LoginComponent />
                  )}
              </Route>

              <Route exact path="/crear_usuario">
                {localStorage.getItem('token') !== null ? (
                  <CrearUsuarioComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              
              <Route exact path="/lista/estado/:id">
                {localStorage.getItem('token') !== null ? (
                  <EstadoComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/registrar_referido">
                {localStorage.getItem('token') == null ? (
                  <RegistrarReferidoComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/registrar_referido/:id">
                {localStorage.getItem('token') == null ? (
                  <RegistrarReferidoComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/registrar_referido_">
                {localStorage.getItem('token') == null ? (
                  <RegistrarReferidoMedia />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/datos_perfil">
                {localStorage.getItem('token') !== null ? (
                  <DatosPerfilComonent/>
                ) : (
                  <LoginComponent/>
                )}
              </Route> 
              <Route exact path="/cambio_contraseña">
                {localStorage.getItem('token') !== null ? (
                  <CambioContraseña/>
                ) : (
                  <LoginComponent/>
                )}
              </Route> 
              <Route exact path="/listado_usuario">
                {localStorage.getItem('token') !== null ?(
                  <ListadoUsuarioComponent/>
                ) : (
                  <LoginComponent/>
                )}
              </Route>

              <Route exact path="/pago/:id">
                {localStorage.getItem('token') !== null ?(
                  <PagoComponent/>
                ) : (
                  <LoginComponent/>
                )}
              </Route>

              <Route exact path="/listado_usuarios_pagos">
                {localStorage.getItem('token') !== null ?(
                  <ListadoUsuariosPagados/>
                ) : (
                  <LoginComponent/>
                )}
              </Route>

              <Route exact path="/headermedia">
                {localStorage.getItem('token') !== null ?(
                  <HeaderMovil/>
                ) : (
                  <LoginComponent/>
                )}
              </Route>

          
              <Redirect to="/"/>
        </Switch> 
      </Router>   

    </div>
  );
}
export default App;
