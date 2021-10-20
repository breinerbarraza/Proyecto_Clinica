import { HeaderComponent } from "./components/HeaderComponent";
import { LoginComponent } from "./components/LoginComponent";
import ComponentPrueva from "./components/ComponentPrueva";
import  { ReferirComponent } from "./components/ReferirComponent"
import{
  BrowserRouter as Router,
  Switch,
  Link,
  Route
}from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
     
        <Switch>
          <Route  path="/registro" component={ ReferirComponent } />
        </Switch>
      </Router>
      
    </div>
  );
}
export default App;
