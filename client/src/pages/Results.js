import React, {Component} from "react";
import { Link } from "react-router-dom";
import ShowArticle from '../components/ShowArticle';
import API from '../utils/API';

class Results extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    if (this.props.location.state) {
      this.state = this.props.location.state;
    }
    else {
      this.state = {
        results: []
      }
    }
}




componentDidMount() {
  this.setState({
    currentList: document.getElementById('currentList').innerText
  })
}

remove (index) {

const newresults = this.state.results;

newresults.splice(index,1);

this.setState({
   results: newresults
 });

}

saveArticle (event) {
const index = event.target.getAttribute('data-index');
const data = this.state.results[index];

API.save(data,this.state.currentList);

}

  render() {
  return <div>
    <div className="row">
      <div className="col-sm-12">
        <br/>

        
        <div className="panel panel-primary">

         
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
          </div>

         
          <div className="panel-body" id="well-section">
            {this.state && this.state.results.length > 0 ? 
              this.state.results.map((item,index) => {
              return <ShowArticle 
                article={item} 
                location='results'
                index={index}
                key={index}
                saveArticle={this.saveArticle.bind(this)}
                remove={this.remove.bind(this)} 
                />
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
export default Results;
