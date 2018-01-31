import React, {Component} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import API from '../../utils/API';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
class Navbar extends Component {

  constructor(props) {
    super(props);
    this.props = props;
}

state = {
  lists: [],
  activeList: ''
}

componentDidMount() {
  API.getAllLists().then((data) => {
    console.log(data);
    this.setState({
      lists: data.data.map((item) => item.name)
    });
  });
}

handleChange (event) {

  this.setState({
    activeList: event.target.value
  });
}

submitList (event) {
  event.preventDefault();

  this.props.changeList(this.state.activeList);
}

  
  
  render() {
    return <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <span className="navbar-brand">
          NYT Search and Save
        </span>
      </div>
      <ul className="nav navbar-nav">
        <li
          className={
            window.location.pathname === "/"
              ? "active"
              : ""
          }
        >
          <Link to="/">Search</Link>
        </li>
       
        <li
          className={window.location.pathname === "/results" ? "active" : ""}
        >
          <Link to="/results">Results</Link>
        </li>
        <li
          className={window.location.pathname === "/saved" ? "active" : ""}
        >
          <Link to="/saved">Saved</Link>
        </li>
        
      </ul>
      <div className='navbar-header list'>
          <ul className='nav navbar-nav'>
            <li>Active List: {this.props.activeList}</li>
            <li>Change List: 
              <form name='listchange'>
                <select defaultValue='Choose' onChange={this.handleChange.bind(this)}>
                  <option value='Choose' disabled>Choose</option>
                  {this.state.lists.map((item,index) => <option value={item} key={index}>{item}</option>)}
                </select>
              </form>
              <button form='listchange' value='Submit' onClick={this.submitList.bind(this)}>Submit</button>
            </li>
          </ul>
      </div>
    </div>
  </nav>;

}

}

export default Navbar;
