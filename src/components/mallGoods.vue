<template>
  <div class="good-item">
    <div style="">
      <div class="good-img">
        <a @click="openProductDeatil(productId)">
          <img v-lazy="product.swiper_pics[0]" :alt="product.name" :key="productId">
        </a>
      </div>
      <h6 class="good-title" v-html="product.name">{{product.name}}</h6>
      <h3 class="sub-title ellipsis">{{product.title}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <a @click="openProductDeatil(productId)">
            <y-button text="查看详情" style="margin: 0 5px"></y-button>
          </a>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(productId,Number(product.cur_price/100).toFixed(2),product.name,product.swiper_pics[0])"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <p><span style="font-size:14px">会员价:￥</span>{{Number(product.cur_price/100).toFixed(2)}} <span
          class="line-through"> ￥{{Number(product.origin_price/100).toFixed(2)}}</span></p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import {addCart} from '/api/goods.js'
  import {mapMutations, mapState} from 'vuex'
  import {getStore} from '/utils/storage'

  export default {
    props: {
      product: {
        cur_price: null
      }
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      openProductDeatil (id) {
        // 在当前窗口打开 如果提供了 path，params 会被忽略
        // this.$router.push({path: 'goodsDetails', params: {productId: '11111'}}) 这样写是错误的,
        // 应该使用命名的路由，或者query
        console.log('detail query product id : ', id)
        this.$router.push({path: 'goodsDetails', query: {productId: id}})
        // 新打开一个标签页
        // window.open('//' + window.location.host + '/goodsDetails?productId=' + id)
      },
      addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            addCart({userId: getStore('userId'), productId: id, productNum: 1}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
            })
          } else { // 未登录 vuex
            this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
          }
          // 加入购物车动画
          var dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart']),
      productId () {
        if (typeof this.product._id === 'string') {
          return this.product._id
        } else {
          return this.product._id.$oid
        }
      }
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";

  .good-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;

      .good-price p {
        display: none;
      }

      .ds {
        display: flex;
      }
    }

    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .good-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }

    .good-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #d44d44;
      font-family: Arial;
      font-size: 18px;
      font-weight: 700;
    }

    .line-through {
      font-size: 12px;
      color: #A69999;
      text-decoration: line-through;
      -moz-text-decoration-color: #A69999;
      -moz-text-decoration-style: wavy;
      -webkit-text-decoration-color: #A69999; //chrome 24.0 开始支持
      -webkit-text-decoration-style: wavy; //chrome 24.0 开始支持
    }

    .good-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }

    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>
