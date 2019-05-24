const R = require('koa-router');
const Router = new R({
  prefix: '/api'
});
const { enc, dec } = require('common/services/helpers');

/*
Router.post(
  '/something',
  (ctx, next) => {
    ctx.state.someKey = someValue
    return next()
  },
  (ctx) => ctx.body = { success: true }
);
*/

module.exports = Router;