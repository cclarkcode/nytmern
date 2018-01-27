import React, {Component} from "react";
import { Link } from "react-router-dom";
import ShowArticle from '../components/ShowArticle';

class Results extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = this.props.location.state;
}


componentDidMount() {
  console.log(this.state);
}

remove (index) {

  this.setState({
    removeindex: index
  }, () => {
    this.clearArticle();
  });

}

clearArticle() {
  console.log('Trying');
  console.log(this.state);
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
            {this.state ? 
              this.state.results.map((item,index) => {
              return <ShowArticle 
                article={item} 
                location='results'
                index={index}
                key={index}
                saveArticle={this.saveArticle}
                remove={this.remove} />
      })
      : 
      <h1>No Results to display. Go to the <Link to="/">Search</Link> page to Search for something </h1>}
    
          </div>
        </div>
      </div>

    </div>
  </div>
    
  }
}
export default Results;
