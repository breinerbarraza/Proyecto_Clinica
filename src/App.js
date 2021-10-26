import './App.css'
import{
  BrowserRouter as Router,
  Switch,
  Route
}from 'react-router-dom'
import { LoginComponent } from "./components/LoginComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { RegistroComponent } from './components/RegistroComponent';
import { ReferirComponent } from './components/ReferirComponent';
import { ListadoComponent } from './components/ListadoComponent';
import { ConfirEmailComponent } from "./components/ConfirEmailComponent";
import { RegistrarReferidoComponent } from './components/RegistrarReferidoComponent';
import { DashboarComponent } from './components/DashboarComponent';


function App() {
  return (
    <div>
      <Router>
        <Switch>
        <Route path ="/email" component={ConfirEmailComponent}/>
        <Route path ="/listado" component={ListadoComponent}/>
        <Route path ="/referir" component={ReferirComponent}/>
        <Route path ="/registro" component={RegistroComponent}/>
        <Route path ="/header" component={HeaderComponent} />
        <Route path ="/login" component={LoginComponent} />
        <Route path ="/registrar_referido" component={RegistrarReferidoComponent}/>
        <Route path ="/dashboar" component={DashboarComponent}/>
      </Switch> 
      </Router>   

    </div>
  );
}
export default App;
