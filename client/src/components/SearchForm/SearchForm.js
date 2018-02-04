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
      let changeValue = event.target.value
    this.setState({
      [event.target.name]: changeValue
    });

    
    
  }

  evaluate = date => {
    
    const test = /^\d{2}\/\d{2}\/\d{4}$/;
    let errormessage = '';
    if (!date.match(test)) {
      
      
        errormessage = 'Date format must be MM/DD/YYYY';
      
    }
    else {
      //Checks for valid date
      errormessage = this.checkDate(date);
    }

    return errormessage;
      
  }  

  checkDate (date) {
    let month = parseInt(date.slice(0,2),10),
        day = parseInt(date.slice(3,5),10),
        year = parseInt(date.slice(6,10),10),
        errormessage = '';

    if (year < 1960 || year > 2018) {
      errormessage = 'Not a valid year, year must be between 1960 and present'
    }
    if (month < 1 || month > 12) {
      errormessage = 'Not a valid month, month must be between 1 and 12'
    } 
    else {
      let checkday = 0;
      if (month === 1 || month === 3 || month === 5 || month === 7 || 
          month === 8 || month === 10 || month === 12) {
            checkday = 31;
          }
      else if (month === 4 || month === 6 || month === 9 || month === 11){
          checkday = 30
      }
      else if (year % 4 === 0) {
          checkday = 29;
      }
      else {
          checkday = 28;
      }

      if (day < 1 || day > checkday) {
        errormessage = 'Not a valid day, day must be between 1 and ' + checkday + ' for that month';
      }
    }
    
    return errormessage;
    
  }

  //Returns true if the start date is after the end date
  compareDates() {
    let startMonth = parseInt(this.state.startyear.slice(0,2),10),
        startDay = parseInt(this.state.startyear.slice(3,5),10),
        startYear = parseInt(this.state.startyear.slice(6,10),10),
        endMonth = parseInt(this.state.endyear.slice(0,2),10),
        endDay = parseInt(this.state.endyear.slice(3,5),10),
        endYear = parseInt(this.state.endyear.slice(6,10),10),
        dateError = false;


    if (endYear < startYear) {
      dateError = true;
      
    }
    else if (startYear === endYear) {
      
      if (endMonth < startMonth) {
        dateError = true;
      }
      else if (startMonth === endMonth) {
        if (endDay < startDay) {
          dateError = true;
        }
      }
    }
    if (dateError) {
      return 'Start date must be before end date'
    }
    else {

      return '';
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

  disableSearch() {
    //Returns whether to enable search button

    //Condition 1: If searchterm exists and no dates are set
    if(this.state.searchterm !== '' && (this.state.startyear === '' && this.state.endyear === '')) {
      return false;
    }

    // Condition 2: If searchterm does not exist
    else if (this.state.searchterm === '') {
      return true;
    }

    // Condition 3, 4: if startyear or endyear exist and have errors
    else if ((this.state.startyear !== '' && this.evaluate(this.state.startyear)
            || (this.state.endyear !== '' && this.evaluate(this.state.endyear)) !== '')) {
      return true;
    }

    // Condition 4: If comparedates returns an error
    else if (this.state.startyear !== '' && this.state.endyear!== '' && this.compareDates() !== ''){
      return true;
    }

    //All conditions met
    else {
      return false;
    }
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
          <label htmlFor="start-year">Start Date (Optional):
            <span style={{
                color: 'red',
                paddingLeft: '25px'}}>
                  {this.state.startyear !== '' ? 
                  this.evaluate(this.state.startyear) : ''}
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
          <label htmlFor="end-year">End Date (Optional):  
            <span style={{
              color: 'red',
              paddingLeft: '25px'}}>
                {this.state.endyear !== '' ?
                this.evaluate(this.state.endyear) !== '' ? this.evaluate(this.state.endyear)
                : this.state.startyear !== '' ? this.compareDates() : ''
                : ''}
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
        disabled={this.disableSearch()}>
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
