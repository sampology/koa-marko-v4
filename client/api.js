const axios = require('axios');
const { domain } = require('common/config.json');

module.exports = {
  API: axios.create({
    baseURL: domain + '/api'
  }),
  Logger: (error) => {
    // TODO send mail with error stack
    console.warn('Ooops, I\'ve got an error');
    console.error(error);
  }
};