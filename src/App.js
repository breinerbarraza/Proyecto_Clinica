
import  { ReferirComponent } from "./components/ReferirComponent"
import{
  BrowserRouter as Router,
  Switch,
  Route
}from 'react-router-dom'
import { LoginComponent } from "./components/LoginComponent";
import { ListadoComponent } from "./components/ListadoComponent";
import { RegistroComponent } from "./components/RegistroComponent";
import { ConfirEmailComponent } from "./components/ConfirEmailComponent";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route  path="/referir_paciente" component={ ReferirComponent } />
          <Route exact path ="/" component={LoginComponent} />
          <Route path="/listadoReferido" component={ListadoComponent}/>
          <Route path="/registro" component={RegistroComponent}/>
          <Route path="/confiEmail" component={ConfirEmailComponent}/>
        </Switch>
      </Router> 

    </div>
  );
}
export default App;
