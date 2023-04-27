import "./App.css";
import Customers from "./components/customers";
import Movies from "./components/movies";
import { Route, Switch, Redirect } from "react-router-dom";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from './components/movieForm';
function App() {
  return (
    <>
    <NavBar/>
    <main className="container">
      <Switch>
        <Route path='/movies/:id' component={MovieForm}></Route>
        <Route path='/movies' component={Movies}></Route>
        <Route path='/customers' component={Customers}></Route>
        <Route path='/rentals' component={Rentals}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Redirect from="/" exact to='/movies'/> 
        <Redirect to='/not-found'/> 
        
      </Switch>
    </main>
    </>
  );
}

export default App;
