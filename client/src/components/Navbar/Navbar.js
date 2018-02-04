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
  activeList: '',
  changeList: ''
}

componentDidMount() {
 this.getData();
}

getData() {
  API.getAllLists().then((data) => {
    
    this.setState({
      lists: data.data.map((item) => {
        if (item.active === true) {
          console.log(item.name);
          this.setState({
            activeList: item.name
          })
        }
        return item.name;})
    });
  });
}

handleChange (event) {

  this.setState({
    changeList: event.target.value
  });
}

submitList (event) {
  event.preventDefault();

  API.changeActiveList(this.state.changeList)
    .then( () => {
     window.location.reload();
    })
  
}

  
  
  render() {
    {console.log(this.state.activeList);}
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
        
        <div className='navbar-right'>

      
      
          <ul className='nav navbar-nav'>
          <li className='navbar-text' id='split'> Active List: <span id='currentList'>{this.state.activeList}</span></li>  
          <li className='navbar-text' id='split'> Change List: </li>
          <li className='navbar-text'> 
              <form className="form-inline my-2 my-lg-0" id='listform'>
                <select 
                placeholder='Choose' 
                value={this.state.changeList}
                onChange={this.handleChange.bind(this)}
                id='listselect'>
                    <option value='Choose' disabled>Choose</option>
                    {this.state.lists.map((item,index) => <option value={item} key={index}>{item}</option>)}
                  </select>
                <button 
                        id='listbutton' 
                        type="submit"
                        onClick={this.submitList.bind(this)}>Change</button>
              </form> 
          </li>  
          </ul> 
        
        </div>
    </div>
  </nav>;

}

}

export default Navbar;
