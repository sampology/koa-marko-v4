const R = require('koa-router')
const Router = new R()
const { startup } = require('client/marko/pages')

Router.get(
  '/',
  ctx => startup(ctx)
)

module.exports = Router