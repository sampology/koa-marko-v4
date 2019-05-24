const moment = require('moment');
const countries = require('common/lib/countries.json');
const helpers = {
  validateEmail: function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  humanDate: (date) => moment(date).format('DD/MM/YYYY'),
  humanStatus: (status) => status === true ? 'Active' : (status === false ? 'Inactive' : 'N/A'),
  humanCountry: (countryCode) => {
    const country = countries.find(x => x.value === countryCode);
    return country.name
  }
};
module.exports = helpers;