const template = require('./index.marko');
const { environment } = require('common/config');
const { enc, dec } = require('common/services/helpers');

module.exports = ctx => {
  const { lang } = ctx.session
  const appData = {
    s: ctx.session,
    path: ctx.path,
    flashMessage: ctx.flash.get() || '',
  };
  ctx.type = 'text/html; charset=utf-8';
  return ctx.body = template.stream({
    tplData: {
      environment,
      lang,
      seo: {
        title: 'Dashboard // KoaJS + MarkoJS v4 Boilerplate'
      }
    },
    appData: enc(appData)
  });
};