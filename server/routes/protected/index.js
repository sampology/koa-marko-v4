const R = require('koa-router')
const Router = new R()
const {dashboard} = require('client/marko/pages')

Router.get(
  '/dashboard',
  ctx => dashboard(ctx)
)

module.exports = Router