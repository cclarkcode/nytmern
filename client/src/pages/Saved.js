import React, { Component } from "react";
import API from "../utils/API";
import ShowArticle from '../components/ShowArticle';
import {Link} from 'react-router-dom';

class Discover extends Component {
  
state = {
  savedResults: []
}

  componentDidMount() {
    this.getData();

  }

  getData () {
  
  API.retrieve().then((data) => {
     
    this.setState({
      savedResults: data.data
    },() => {
      console.log(this.state);
    });
   });

  }

  remove = event => {
    const index = event.target.getAttribute('data-index');

    console.log('Trying');

    API.remove(this.state.savedResults[index]._id)
      .then( () => {

        this.getData();

      });
  } 

  

  render() {

      return <div>
    <div className="row">
      <div className="col-sm-12">
        <br/>

        
        <div className="panel panel-primary">

         
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-table"></i>  Saved Articles</strong></h3>
          </div>

         
          <div className="panel-body" id="well-section">
            {this.state ? 
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
      <h1>No Results to display. Go to the <Link to="/">Search</Link> page to Search for something </h1>}
    
          </div>
        </div>
      </div>

    </div>
  </div>;
    
  }
}

export default Discover;
