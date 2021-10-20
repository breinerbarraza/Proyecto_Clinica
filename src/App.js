import { HeaderComponent } from "./components/HeaderComponent";
import  { ReferirComponent } from "./components/ReferirComponent"
import{
  BrowserRouter as Router,
  Switch,
  Link,
  Route
}from 'react-router-dom'
import { LoginComponent } from "./components/LoginComponent";
import { LsitadoComponent } from "./components/LsitadoComponent";

function App() {
  return (
    <div>
      <Router>


        <Switch>
          <Route  path="/referir_paciente" component={ ReferirComponent } />
          <Route path ="/login" component={LoginComponent} />
          <Route path="/tabla" component={LsitadoComponent}/>
        </Switch>
      </Router> 
      
    </div>
  );
}
export default App;
