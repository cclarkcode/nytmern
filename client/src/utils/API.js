import axios from "axios";

// Export an object containing method used to hit NYT API


export default {
  search: function(searchTerm,startYear,endYear) {

    const BaseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

    let fullURL = BaseURL + authKey + '&q=' + searchTerm;
    if (startYear) {
      fullURL+= "&begin_date=" + startYear + "0101";
    }
    if (endYear) {
      fullURL+= "&end_date=" + endYear + "0101";
    }
    return axios.get(fullURL);
  },

  save: function(articledata) {
    return axios.post('/api/newarticle',articledata);
  },

  retrieve: function() {
    return axios.get('/api/articles');
  },
  formatDate: function(date) {
      var truncdate = date.substr(0,10);
      return truncdate.substr(5,5) + '-' + truncdate.substr(0,4);
  },

  remove: function(id) {
    return axios.delete('/api/' + id);
  },

  getAllLists: function() {
    return axios.get('/api/alllists');
  },

  getActiveList: function() {
    return axios.get('/api/activelist');
  },

  changeActiveList: function(listName) {
    return axios.post('/api/activelist/' + listName);
  }
  
};
