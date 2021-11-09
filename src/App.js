import './App.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

}from 'react-router-dom'
import { LoginComponent } from "./components/LoginComponent";
import { HeaderComponent } from "./components/HeaderComponent";
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
            <Route exact path="/login">
              {
                (localStorage.getItem('token') !== null)
                ? <ListadoComponent />
                : <LoginComponent />
              }
            </Route>

            <Route exact path="/registro">
              {
                (localStorage.getItem('token') !== null)
                ? <ListadoComponent />
                : <RegistroComponent />
              }
            </Route>

              <Route exact path="/listado">
                {localStorage.getItem('token') !== null ? (
                  <ListadoComponent />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/email">
                {localStorage.getItem('token') !== null ? (
                  <ConfirEmailComponent />
                ) : (
                  <LoginComponent />
                )}
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
              <Route exact path="/dashboard2">
                {localStorage.getItem('token') !== null ? (
                  <Dashboard2Component/>
                ) : (
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
              <Route exact path="/listado_referido">
                {localStorage.getItem('token') !== null ? (
                  <ListadoReferidoComponent />
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
                {localStorage.getItem('token') !== null ? (
                  <RegistrarReferidoComponent />
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
              <Redirect to="/"/>    {/*
            <Route exact  path ="/email" component={ConfirEmailComponent}/>
            <Route exact  path ="/listado" component={ListadoComponent}/>
            <Route exact  path ="/referir" component={ReferirComponent}/>
            <Route exact  path ="/registro" component={RegistroComponent}/>
            <Route exact  path ="/header" component={HeaderComponent}/>
            <Route exact  path ="/login" component={LoginComponent}/>
            <Route exact  path ="/registrar_referido" component={RegistrarReferidoComponent}/>
            <Route exact  path ="/dashboard" component={DashboardComponent}/>
            <Route exact  path ="/crear_usuario" component={CrearUsuarioComponent}/>
            <Route exact  path ="/listado_referido" component={ListadoReferidoComponent}/>
            <Route exact  path ="/listado/pre_quirurgico/:id" component={PreQuirugicoComponent}/>
            <Route exact  path ="/listado/programado/:id" component={ProgramadoComponent}/>
            <Route exact  path ="/Listado/descartado/:id" component={DescartadoComponent}/>
            <Route exact  path ="/lista/gestion/:id" component={GestionComponent}/> 
            <Route exact  path ="/lista/pendiente/:id" component={PendienteComponent}/>
            <Route exact  path ="/lista/operado/:id" component={OperadoComponent}/>*/}
        </Switch> 
      </Router>   

    </div>
  );
}
export default App;
