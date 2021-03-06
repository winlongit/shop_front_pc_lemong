import http from './public'
// 商品列表
export const getAllGoods = (params) => {
  return http.fetchGet('/api/v1/product/get_goods', params)
}
// 获取购物车列表
export const getCartList = (params) => {
  // 这里做一下参数名字的变化，这个人写的参数名字和我的完全不一样，他么的我还需要在拿到结果后再包装一下
  return new Promise(function (resolve, reject) {
    http.fetchPost('/api/v1/cart/cartList', params).then(
      res => {
        console.log('come to return cartList modify /src/api/goods.js 11')
        console.log(res, res.success, res.success === true)
        if (res.success === true) {
          res.result.forEach(item => {
            console.log('come to return cartList modify /src/api/goods.js 22')
            item.productName = item.name
            item.productImg = item.swiper_pics[0]
            item.salePrice = item.cur_price / 100
            item.productId = item.product_id
            item.checked = item.checked.toString()
          })
        }
        resolve(res)
      })
  })
}
// 加入购物车
export const addCart = (params) => {
  return http.fetchPost('/api/v1/cart/add', params)
}
// 删除购物车
export const delCart = (params) => {
  return http.fetchPost('/member/delCart', params)
}
// 删除购物车勾选商品
export const delCartChecked = (params) => {
  return http.fetchPost('/member/delCartChecked', params)
}
// 编辑购物车
export const cartEdit = (params) => {
  return http.fetchPost('/api/v1/cart/edit', params)
}
// 全选
export const editCheckAll = (params) => {
  return http.fetchPost('/member/editCheckAll', params)
}
// 删除整条购物车
export const cartDel = (params) => {
  return http.fetchPost('/member/cartDel', params)
}
// 获取用户地址
export const addressList = (params) => {
  return http.fetchPost('/api/v1/address/addressList', params)
}
// 通过id获取地址
export const getAddress = (params) => {
  return http.fetchPost('/member/address', params)
}
// 修改收货地址
export const addressUpdate = (params) => {
  return http.fetchPost('/api/v1/address/editAddress', params)
}
// 添加收货地址
export const addressAdd = (params) => {
  return http.fetchPost('/api/v1/address/addAddress', params)
}
// 删除收货地址
export const addressDel = (params) => {
  return http.fetchPost('/api/v1/address/delAddress', params)
}
// 生成订单
export const submitOrder = (params) => {
  // TODO 对接的支付接口，这个接口还是需要变一下的
  // return http.fetchPost('https://swu.mynatapp.cc/wx/shop_pc_pay/reqPay', params)
  return http.fetchPost('/api/v1/order/new_order', params)
}
// 支付
export const payMent = (params) => {
  return http.fetchPost('/member/payOrder', params)
}
// 获取用户订单
export const orderList = (params) => {
  return http.fetchGet('/api/v1/order/get_orders', params)
}
// 获取单个订单详情
export const getOrderDet = (params) => {
  return http.fetchGet('/api/v1/order/query_order', params)
}
// 取消订单
export const cancelOrder = (params) => {
  return http.fetchPost('/member/cancelOrder', params)
}
// 商品详情
export const productDet = (params) => {
  return http.fetchGet('/api/v1/product/get_good_detail', params)
}
// 删除订单
export const delOrder = (params) => {
  return http.fetchPost('/api/v1/order/del_order', params)
}
// 商品列表
export const getSearch = (params) => {
  return http.fetchGet('/goods/search', params)
}
// 快速搜索
export const getQuickSearch = (params) => {
  return http.fetchGet('/goods/quickSearch', params)
}
