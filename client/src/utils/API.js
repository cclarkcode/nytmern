import axios from "axios";

// Export an object containing method used to hit NYT API
const BaseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=";
const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

export default {
  search: function(searchTerm,startYear,endYear) {
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
    return axios.post('/newarticle',articledata);
  }
};
