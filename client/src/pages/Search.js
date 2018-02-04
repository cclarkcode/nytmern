import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";


class Search extends Component {
  
  constructor(props) {
    super(props);
    this.props = props;
}

componentDidMount() {
  this.setState({
    currentList: document.getElementById('currentList').innerText
  }, () => {
    API.getCurrentList(this.state.currentList)
      .then((data)=> {
        console.log(data);
      })
  });
}
  
state = {
  currentList: '',
  search: '',
  results: [],
  savedResults: [] 
}

  formatData = data => {
    let newData = [];

    data.map((item) => {
      newData.push({
        title: item.headline.main,
        link: item.web_url,
        byline: item.byline.original,
        date: API.formatDate(item.pub_date)
      });
    });
  
    console.log(newData);

    return newData;
  }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  search = (searchTerm,startDate,endDate) => {
    
    API.search(searchTerm,startDate,endDate)
      .then(res => {
        this.setState({ 
          search: searchTerm,
          results: this.formatData(res.data.response.docs)
        }, () => {
          this.props.history.push({
            pathname: '/results',
            state: this.state
          });
        });
        
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
          </div>
          <div className="panel-body">
            
            <SearchForm
              search={this.search.bind(this)}
            />
          </div>
        </div>
        
      </Container>
    );
  }
}

export default Search;
