import React, { Component } from "react";
import API from "../utils/API";
import ShowArticle from '../components/ShowArticle';
import {Link} from 'react-router-dom';
import './Saved.css';

class Discover extends Component {
  
state = {
  currentList: '',
  savedResults: [],
  newlist: ''
}

  componentDidMount() {
    API.getActiveList().then( (response) => {
      console.log(response);
      this.setState({
        currentList: response.data.name
      }, () => {
        console.log(this.state.currentList);
        this.getData();
      })
      
    });

  }

  getData () {
  console.log(this.state.currentList);
  API.retrieve(this.state.currentList).then((data) => {

    console.log(data);
    if (data.data.articles) {

    
    this.setState({
      savedResults: data.data.articles
    });
  }
  
});
  }

  remove = event => {
    const index = event.target.getAttribute('data-index');

    console.log('Trying');

    API.remove(this.state.savedResults[index]._id,this.state.currentList)
      .then( () => {

        this.getData();

      });
  } 

  handleChange (event) {
    
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitList = event => {
    
    event.preventDefault();
    API.addList(this.state.newlist)
      .then( () => {
        window.location.reload();
      });
  }

  

  render() {

      return <div>
        {console.log(this.state)}
    <div className="row">
      <div className="col-sm-12">
        <br/>

        
        
        <div className="panel panel-primary">

         
          <div className="panel-heading">
            <h3 className="panel-title">
              <strong>
                <i className="fa fa-table"></i>  Saved Articles
              </strong>
              <div className='panel-right' id='newlistform'>
                
                <form className="form-inline my-2 my-lg-0" id='listform'>
                <span> Save as Custom List: &nbsp; &nbsp; &nbsp; </span>
                  <input 
                  placeholder = 'New List Name' 
                  value={this.state.newlist}
                  name='newlist'
                  onChange={this.handleChange.bind(this)}
                  id='newlist'/>
                  
                  <button 
                          id='listbutton' 
                          type="submit"
                          onClick={this.submitList.bind(this)}>Submit</button>
                </form> 
              </div>
              
            </h3>
          </div>

         
          <div className="panel-body" id="well-section">
            {this.state && this.state.savedResults && this.state.savedResults.length > 0 ? 
              this.state.savedResults.map((item,index) => {
              return <ShowArticle 
                article={item} 
                location='saved'
                index={index}
                key={index}
                formatDate={API.formatDate}
                remove={this.remove.bind(this)}/>
      })
      : 
      <h1>No Results to display. Go to the <Link to="/">Search</Link> page to Search for something </h1>
      }
    
          </div>
        </div>
      </div>

    </div>
  </div>;
    
  }
}

export default Discover;
