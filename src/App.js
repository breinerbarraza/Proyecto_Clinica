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
import { RegiatrarReferidoMedia } from './components/componentMediaQuery/RegistrarReferidoMedia';
import { ReferidoMedia } from './components/componentMediaQuery/ReferidoMedia'
import './App.css'

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

            <Route exact path="/registro/:id">
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
              <Route exact path="/referido_/:id">
                {localStorage.getItem('token') == null ? (
                  <ReferidoMedia />
                ) : (
                  <LoginComponent />
                )}
              </Route>
              <Route exact path="/registrar_referido_">
                {localStorage.getItem('token') == null ? (
                  <RegiatrarReferidoMedia />
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
              <Redirect to="/"/>
        </Switch> 
      </Router>   

    </div>
  );
}
export default App;
