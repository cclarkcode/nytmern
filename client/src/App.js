import React, {Component} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./pages/Saved";
import Results from "./pages/Results";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Jumbotron from './components/Jumbotron';
import Container from './components/Container';


class App extends Component {

   
 render= () =>  <Router>
    <Container>
      <Navbar />
      <Jumbotron/>
      <Wrapper>
        <Route exact path="/" component={Search} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/saved" component={Saved} />
        <Route exact path="/results" component={Results} />
      </Wrapper>
      
    </Container>
  </Router>;

}

export default App;
