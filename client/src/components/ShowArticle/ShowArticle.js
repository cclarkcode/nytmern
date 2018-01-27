import React, {Component} from "react";
import "./ShowArticle.css";
import API from '../../utils/API'

class ShowArticle extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    
}

componentDidMount() {
  console.log(this.props);
}


render() {
  return <div className='well' id={'article'+(this.props.index+1)}>
    <h3 className='articleHeadline'>
      <span className='label label-primary'>
        {this.props.index+1}
      </span>
      <a href={this.props.article.link}>
        {this.props.article.title}
      </a>
    </h3>
    {this.props.article.byline 
    ? <h5>{this.props.article.byline}</h5>
    : ''}
    <h5>
      {this.props.article.date ? 
          API.formatDate(this.props.article.date) : ''}
    </h5>
    {this.props.location === 'results' ? 
    <button className='btn btn-primary'
        onClick={this.props.saveArticle}
        data-index={this.props.index+1}>
        Save Article
    </button>
    : ''}
    <button className='btn btn-danger'
        onClick={this.props.remove}
        data-index={this.props.index}>
        Remove Article
    </button>
  </div>

}
  
}

export default ShowArticle;
