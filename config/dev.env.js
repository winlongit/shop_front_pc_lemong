var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:5000"'
})
// 在 axios 中直接 axios.defaults.baseURL = process.env.API_ROOT 就可以 dev build用不同的url 了
