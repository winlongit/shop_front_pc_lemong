import axios from 'axios'
// axios 默认是用 json 传数据的
axios.defaults.timeout = 10000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded'
axios.defaults.baseURL = process.env.API_ROOT

export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
