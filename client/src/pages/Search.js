import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";


class Search extends Component {
  
  constructor(props) {
    super(props);
    this.props = props;
}

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  // componentDidMount() {
  //   console.log('Running mount');
  //   API.search('Trump',2010)
  //     .then(res => {
  //       this.setState({ results: res.data.response.docs })
  //       console.log(this.state.results);
  //     })
  //     .catch(err => console.log(err));
  // }

  handleInputChange = event => {
    this.setState({ search: event.target.value });
  };

  search = (searchTerm,startYear,endYear) => {
    
    API.search(searchTerm,startYear,endYear)
      .then(res => {
        this.setState({ 
          search: searchTerm,
          results: res.data.response.docs
        });
        this.props.history.push({
          pathname: '/results',
          state: this.state
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
              search={this.search}
            />
          </div>
        </div>
        
      </Container>
    );
  }
}

export default Search;
