const Config = require('common/config.json');

const Constants = {
  APP: {
    ENV: Config.environment
  },
  DEV: {
    EMAIL: 'andrei.margulis@gmail.com',
    ENV: 'development',
    PORT: 3133
  },
  PRD: {
    EMAIL: 'andrei.margulis@gmail.com',
    ENV: 'production',
    PORT: 3133
  },
  COMPANY: {
    NAME: '',
    ADDRESS: '',
    PHONE: '',
    EMAIL: '',
    LOGO: {
      PATH: 'static/img/site-logo.png',
      WIDTH: '200',
      HEIGHT: '50'
    }
  },
  BACKEND: {
    API: '',
    USER: '',
    TOKEN: ''
  },
  SMTP: {
    host: '',
    port: '',
    secure: true,
    auth: {
      user: '',
      pass: ''
    }
  },
  FROM: 'FROM <mailman@email.com>',
  BCC: 'AM <andrei.margulis@gmail.com>',
  FTP_DATA: {
    host: '',
    user: '',
    password: '',
    destination: ''
  },
  AUTH: {
    FACEBOOK: {
      APP_ID: '',
      APP_SECRET: ''
    }
  }
};

module.exports = Constants;
