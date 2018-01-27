import React, {Component} from "react";
import "./ShowArticle.css";
import API from '../../utils/API';

class ShowArticle extends Component {

  constructor(props) {
    super(props);
    this.props = props;
}

formatdate(date) {
  var truncdate = date.substr(0,10);
  return truncdate.substr(5,5) + '-' + truncdate.substr(0,4);
}

clearArticle (event) {
  
  console.log(event);

  
  // this.props.remove(event.target.getAttribute('data-index'));
}

saveArticle (event) {
  event.preventDefault();


}

render() {
  return <div className='well' id={'article'+(this.props.index+1)}>
    <h3 className='articleHeadline'>
      <span className='label label-primary'>
        {this.props.index+1}
      </span>
      <a href={this.props.article.web_url}>
        {this.props.article.headline.main}
      </a>
    </h3>
    {this.props.article.byline 
    ? <h5>{this.props.article.byline.original}</h5>
    : ''}
    <h5>
      {this.props.article.pub_date ? 
          this.formatdate(this.props.article.pub_date) : ''}
    </h5>
    <button className='btn btn-primary'
        onClick={this.props.saveArticle}
        data-index={this.props.index+1}>
        Save Article
    </button>
    {/* <button className='btn btn-danger'
        onClick={this.clearArticle}
        data-index={this.props.index}>
        Remove Article
    </button> */}
  </div>

}
  
  // var wellSection = $("<div>");
  // wellSection.addClass("well");
  // wellSection.attr("id", "article-well-" + articleCounter);
  // $("#well-section").append(wellSection);

  // // Confirm that the specific JSON for the article isn't missing any details
  // // If the article has a headline include the headline in the HTML
  // if (NYTData.response.docs[i].headline !== "null") {
  //   $("#article-well-" + articleCounter)
  //     .append(
  //       "<h3 class='articleHeadline'><span class='label label-primary'>" +
  //       articleCounter + "</span><strong> " +
  //       NYTData.response.docs[i].headline.main + "</strong></h3>"
  //     );

  //   // Log the first article's headline to console
  //   console.log(NYTData.response.docs[i].headline.main);
  // }

  // // If the article has a byline include the headline in the HTML
  // if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
  //   $("#article-well-" + articleCounter)
  //     .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

  //   // Log the first article's Author to console.
  //   console.log(NYTData.response.docs[i].byline.original);
  // }

  // // Then display the remaining fields in the HTML (Section Name, Date, URL)
  // $("#articleWell-" + articleCounter)
  //   .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
  // $("#articleWell-" + articleCounter)
  //   .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
  // $("#articleWell-" + articleCounter)
  //   .append(
  //     "<a href='" + NYTData.response.docs[i].web_url + "'>" +
  //     NYTData.response.docs[i].web_url + "</a>"
  //   );


  }

export default ShowArticle;
