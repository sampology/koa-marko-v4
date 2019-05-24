require('@babel/polyfill')
require('app-module-path').addPath(process.cwd())
require('marko/node-require')
require('lasso/node-require-no-op').enable('.less', '.scss', '.css')

const Koa = require('koa')
const conditional = require('koa-conditional-get')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const favicon = require('koa-favicon')
const session = require('koa-session-minimal')
const flash = require('koa-flash-simple')
const helmet = require('koa-helmet')
const etag = require('koa-etag')
const uuid = require('uuid')
const router = require('koa-router')()
const passport = require('koa-passport')
const mount = require('koa-mount')
const cacheControl = require('koa-cache-control')
const Constants = require('server/constants')
const Config = require('common/config')

const PublicRoutes = require('server/routes.json').public
const ProtectedRoutes = require('server/routes.json').protected
const isProduction = Config.environment === 'production'

require('lasso').configure({
  require: {
    transforms: [
      {
        transform: 'lasso-babel-transform',
        config: {
          extensions: ['.js'],
          babelOptions: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    {
      plugin: 'lasso-sass',
      config: {
        extensions: ['scss', 'css']
      }
    },
    {
      plugin: 'lasso-autoprefixer',
      config: {
        browsers: [
          'Chrome >= 45',
          'Firefox ESR',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 9',
          'Safari >= 9',
          'Android >= 4.4',
          'Opera >= 30'
        ]
      }
    },
    'lasso-marko'
  ],
  outputDir: `${__dirname}/static`,
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction,
})

const app = new Koa()
app.proxy = true
app.use(cacheControl({
  noStore: true,
  noCache: true,
  mustRevalidate: true,
  staleWhileRevalidate: 320,
  staleIfError: 404
}))
app.use(favicon('./static/img/favicon.ico'))
app.use(conditional())
app.use(etag())
app.use(helmet())
app.use(bodyParser())
app.use(compress({
  filter: content_type => /text/i.test(content_type),
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))
app.use(mount('/static', require('koa-static')('static')))
app.use(session({
  maxAge: 24 * 60 * 60 * 1000, // One Day,
  key: 'KOA-SSID'
}))
app.keys = [uuid.v4(), uuid.v4()]
app.use(flash())
app.use(router.allowedMethods())

app.use(passport.initialize())
app.use(passport.session())

app.use((ctx, next) => {
  ctx.session.lang = ctx.session.lang || 'en'
  if (0) {
    ctx.login({
      _id: "5c3e066c43af7d486c4bb784",
      profile: {
        name: "Andrei Margulis",
        email: "andrei.margulis@gmail.com",
      }
    })
  }
  return next()
})

if (PublicRoutes.length > 0) PublicRoutes.forEach(r => app.use(require(r).routes()))

// User needs to be auth to access Protected routes
app.use((ctx, next) => {
  // console.log(ctx.path); // track 404 URLs that redirect to /login
  if (ctx.isAuthenticated()) {
    return next()
  }
  return ctx.redirect('/')
})
if (ProtectedRoutes.length > 0) ProtectedRoutes.forEach(r => app.use(require(r).routes()))

app.on('error', err => {
  // TODO Send email with error stack
  console.warn('Server Error: ', err)
})
const PORT = isProduction ? Constants.PRD.PORT : Constants.DEV.PORT
app.listen(PORT, () => {
  if (process.send) {
    process.send('online')
  }
})
