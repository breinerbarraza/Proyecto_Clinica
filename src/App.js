import './App.css'
import{
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

}from 'react-router-dom'
import ComponentPrueva from "./components/ComponentPrueva";
import { LoginComponent } from "./components/LoginComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { RegistroComponent } from './components/RegistroComponent';
import { ReferirComponent } from './components/ReferirComponent';
import { ListadoComponent } from './components/ListadoComponent';
import { ConfirEmailComponent } from "./components/ConfirEmailComponent";
import { RegistrarReferidoComponent } from './components/RegistrarReferidoComponent';
import { DashboarComponent } from './components/DashboarComponent';
import { CrearUsuarioComponent } from './components/CrearUsuarioComponent';
import { ListadoReferidoComponent } from './components/ListadoReferidoComponent';
import { ProgramadoComponent } from './components/ComponetEstados/ProgramadoComponent';
import { DescartadoComponent } from './components/ComponetEstados/DescartadoComponent';
import { GestionComponent } from './components/ComponetEstados/GestionComponent';
import { PendienteComponent } from './components/ComponetEstados/PendeinteComponent';
import { PreQuirugicoComponent } from './components/ComponetEstados/PreQuirugicoComponent';
import { OperadoComponent } from './components/ComponetEstados/OperadoComponent';

function App() {
  return (
    <div>
      <Router>
          <Switch>
            <Route exact  path="/prueva" component={ComponentPrueva}/>
            <Route exact  path ="/email" component={ConfirEmailComponent}/>
            <Route exact  path ="/listado" component={ListadoComponent}/>
            <Route exact  path ="/listado/pre_quirurgico/:id" component={PreQuirugicoComponent}/>
            <Route exact  path ="/referir" component={ReferirComponent}/>
            <Route exact  path ="/registro" component={RegistroComponent}/>
            <Route exact  path ="/header" component={HeaderComponent} />
            <Route exact  path ="/login" component={LoginComponent} />
            <Route exact  path ="/registrar_referido" component={RegistrarReferidoComponent}/>
            <Route exact  path ="/dashboar" component={DashboarComponent}/>
            <Route exact  path ="/crear_usuario" component={CrearUsuarioComponent}/>
            <Route exact  path ="/listado_referido" component={ListadoReferidoComponent}/>
            <Route exact  path ="/listado/programado/:id" component={ProgramadoComponent}/>
            <Route exact  path ="/Listado/descartado/:id" component={DescartadoComponent}/>
            <Route exact  path ="/lista/gestion/:id" component={GestionComponent}/> 
            <Route exact  path ="/lista/pendiente/:id" component={PendienteComponent}/>
            <Route exact  path ="/lista/operado/:id" component={OperadoComponent}/>
            <Redirect to="/listado"/>
        </Switch> 
      </Router>   

    </div>
  );
}
export default App;
