var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.181.1:5000"',
  WEB_ROOT: '"http://localhost:9999"'
})
// 在 axios 中直接 axios.defaults.baseURL = process.env.API_ROOT 就可以 dev build用不同的url 了
