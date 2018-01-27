import React, {Component} from "react";
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.props = props;
}

  state = {
    searchterm: '',
    startyear: '',
    startyearerror: '',
    endyear: '',
    endyearerror: ''
  }

  

  handleChange = event => {
    
    this.setState({
      [event.target.name]: event.target.value
    });

    if (event.target.name.substr('year')) {
      this.evaluate(event);
    }
  }

  evaluate = event => {
    const test = /^[\d]*$/;
    if (!event.target.value.match(test)) {
      
      this.setState({
        [event.target.name + 'error']: 'The Year must be a valid number'
      })
    }
    else {
      if (event.target.value === ''  || (parseInt(event.target.value,10) >= 1960 && parseInt(event.target.value,10) <= 2018)) {
        // if (this.state.startyear > this.state.endyear && this.state.startyear !== '' && this.state.endyear !== '') {
        //   this.setState({
        //     [event.target.name + 'error']: 'Start year must be less than or equal to end year'
        //   })
        // } else {
          this.setState({
            startyearerror: '',
            endyearerror: ''
          });
        
    }
    else {
      this.setState({
        [event.target.name + 'error']: 'Year must be between 1960 and present'
      });
    }
    }
  }  

  clear = event => {

    this.setState({
      searchterm: '',
      startyear: '',
      startyearerror: '',
      endyear: '',
      endyearerror: ''
    })
  }

  send = event => {
    event.preventDefault();

    this.props.search(this.state.searchterm,this.state.startyear,this.state.endyear);

  }

  

  
  render = () => 
    <form className="search">
    
      <div className="form-group">
        <label htmlFor="search">Search Term:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type in a search term to look for"
          id="search-term"
          name='searchterm'
          value={this.state.searchterm}
          onChange={this.handleChange}
        />

        <div className="form-group">
          <label htmlFor="start-year">Start Year (Optional):
            <span style={{
                color: 'red',
                paddingLeft: '25px'}}>
                  {this.state.startyearerror}
            </span>  
          </label>
          <input 
            type="text" 
            className="form-control" 
            id="start-year"
            name='startyear'
            value={this.state.startyear}
            onChange={this.handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="end-year">End Year (Optional):  
            <span style={{
              color: 'red',
              paddingLeft: '25px'}}>
                {this.state.endyearerror}
            </span>
            
            </label>
          <input 
            type="text" 
            className="form-control" 
            id="end-year"
            name='endyear'
            value={this.state.endyear}
            onChange={this.handleChange}
          />
        </div>

        <button 
        type="submit" 
        className="btn btn-default" 
        id="run-search"
        onClick={this.send}
        disabled={this.state.startyearerror !== '' || this.state.endyearerror !== '' || this.state.searchterm === ''}>
        <i className="fa fa-search"></i>
          Search
        </button>
        <button 
          type="button" 
          className="btn btn-default"
          onClick={this.clear} 
          id="clear-all">
          <i className="fa fa-trash"></i>
            Clear Results
          </button>
          <span style={{
              color: 'red',
              paddingLeft: '25px'}}>
                {this.state.submiterror}
            </span>
      </div>
    </form>;
  
}

export default SearchForm;
