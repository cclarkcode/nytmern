import axios from "axios";

// Export an object containing method used to hit NYT API


export default {
  search: function(searchTerm,startDate,endDate) {

    const startMonth = startDate.slice(0,2),
          startDay = startDate.slice(3,5),
          startYear = startDate.slice(6,10),
          endMonth = endDate.slice(0,2),
          endDay = endDate.slice(3,5),
          endYear = endDate.slice(6,10);

    const BaseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    let fullURL = BaseURL + authKey + '&q=' + searchTerm;
    if (startDate) {
      fullURL+= "&begin_date=" + startYear + startMonth + startDay;
    }
    if (endDate) {
      fullURL+= "&end_date=" + endYear + endMonth + endDay;
    }
    console.log(fullURL);
    return axios.get(fullURL);
  },

  save: function(articledata,currentList) {
    return axios.post('/api/newarticle/' + currentList,articledata);
  },

  retrieve: function(currentList) {
    
    return axios.get('/api/articles/' + currentList);
  },
  formatDate: function(date) {
      var truncdate = date.substr(0,10);
      return truncdate.substr(5,5) + '-' + truncdate.substr(0,4);
  },

  remove: function(id,list) {
    console.log('Trying to delete client side');
    return axios.delete('/api/' + list + '/' + id);
  },

  getAllLists: function() {
    return axios.get('/api/alllists');
  },

  getActiveList: function() {
    return axios.get('/api/activelist');
  },

  changeActiveList: function(listName) {
    return axios.post('/api/activelist/' + listName);
  },
  getCurrentList: function(list) {
    return axios.get('/api/articles/' + list);

  },

  addList: function(list) {
    console.log('getting here');
    return axios.post('/api/newlist/' + list);
  }
  
};
