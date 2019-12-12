<!--商品详情-->
<template>
  <div class="w store-content">
    <div class="gray-box">
      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="(item,i) in small" :key="i" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.name">
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big" :alt="product.name">
            </div>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.name}}</h4>
          <h6>
            <span>{{product.title}}</span>
            <span class="price">
              <em>¥</em><i>{{Number(product.cur_price/100).toFixed(2)}} </i><i class="line-through"> {{Number(product.origin_price/100).toFixed(2)}}</i></span>
          </h6>
        </div>
        <div class="num">
          <span class="params-name">数量</span>
          <buy-num @edit-num="editNum" :limit="Number(product.limitNum)"></buy-num>
        </div>
        <div class="buy">
          <y-button text="加入购物车"
                    @btnClick="addCart(product.productId,Number(product.cur_price/100).toFixed(2),product.name,product.swiper_pics[0])"
                    classStyle="main-btn"
                    style="width: 145px;height: 50px;line-height: 48px"></y-button>
          <y-button text="现在购买"
                    @btnClick="checkout(product.productId)"
                    style="width: 145px;height: 50px;line-height: 48px;margin-left: 10px"></y-button>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info">
      <y-shelf title="产品信息">
        <div slot="content">
<!--          <div class="img-item" v-if="productMsg">-->
<!--            <div v-html="productMsg">{{ productMsg }}</div>-->
<!--          </div>-->
          <div class="img-item" v-if="product.desc_pics">
            <img v-for="(desc_pic_url,i) in product.desc_pics" :key="i" :src="desc_pic_url"/>
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png">
            <br>
            该商品暂无内容数据
          </div>
        </div>
      </y-shelf>
    </div>
  </div>
</template>
<script>
  import {productDet, addCart} from '/api/goods'
  import {mapMutations, mapState} from 'vuex'
  import YShelf from '/components/shelf'
  import BuyNum from '/components/buynum'
  import YButton from '/components/YButton'
  import {getStore} from '/utils/storage'

  export default {
    data () {
      return {
        productMsg: {},
        small: [],
        big: '',
        product: {
          swiper_pics: null,
          desc_pics: null,
          productId: null,
          salePrice: null
        },
        productNum: 1,
        userId: ''
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      _productDet (productId) {
        productDet({params: {productId}}).then(res => {
          let result = res.result
          this.product = result
          this.productMsg = result.desc_pics || ''
          this.big = this.product.swiper_pics[0]
          this.small = this.product.swiper_pics
          this.product.productId = this.product._id.$oid
          if (!this.product.limitNum) {
            this.product.limitNum = 100
          }
        })
      },
      addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            addCart({userId: this.userId, productId: id, productNum: this.productNum}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({
                productId: id,
                salePrice: price,
                productName: name,
                productImg: img,
                productNum: this.productNum
              })
            })
          } else { // 未登录 vuex
            this.ADD_CART({
              productId: id,
              salePrice: price,
              productName: name,
              productImg: img,
              productNum: this.productNum
            })
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
      },
      checkout (productId) {
        // 购买还没做呢,后面再搞吧
        // this.$router.push({path: '/checkout', query: {productId, num: this.productNum}})
        this.$notify.info({
          title: '购买',
          message: '暂不支持支付，该功能正在开发...'
        })
      },
      editNum (num) {
        this.productNum = num
      }
    },
    components: {
      YShelf, BuyNum, YButton
    },
    mounted () {
      let id = this.$route.query.productId
      this._productDet(id)
      this.userId = getStore('userId')
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/mixin";

  .store-content {
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
  }

  .gray-box {
    display: flex;
    padding: 60px;
    margin: 20px 0;

    .gallery-wrapper {
      .gallery {
        display: flex;
        width: 540px;

        .thumbnail {
          li:first-child {
            margin-top: 0px;
          }

          li {
            @include wh(80px);
            margin-top: 10px;
            padding: 12px;
            border: 1px solid #f0f0f0;
            border: 1px solid rgba(0, 0, 0, .06);
            border-radius: 5px;
            cursor: pointer;

            &.on {
              padding: 10px;
              border: 3px solid #ccc;
              border: 3px solid rgba(0, 0, 0, .2);
            }

            img {
              display: block;
              @include wh(100%);
            }
          }
        }

        .thumb {
          .big {
            margin-left: 20px;
          }

          img {
            display: block;
            @include wh(440px)
          }
        }
      }
    }

    // 右边
    .banner {
      width: 450px;
      margin-left: 10px;

      h4 {
        font-size: 24px;
        line-height: 1.25;
        color: #000;
        margin-bottom: 13px;
      }

      h6 {
        font-size: 14px;
        line-height: 1.5;
        color: #bdbdbd;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .sku-custom-title {
        overflow: hidden;
        padding: 8px 8px 18px 10px;
        position: relative;
      }

      .params-name {
        padding-right: 20px;
        font-size: 14px;
        color: #8d8d8d;
        line-height: 36px;
      }

      .num {
        padding: 29px 0 8px 10px;
        border-top: 1px solid #ebebeb;
        display: flex;
        align-items: center;
      }

      .buy {
        position: relative;
        border-top: 1px solid #ebebeb;
        padding: 30px 0 0 10px;
      }
    }
  }

  .item-info {

    .gray-box {
      padding: 0;
      display: block;
    }

    .img-item {
      width: 1220px;
      // padding: 1vw;
      text-align: center;
      font-size: 0;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
  }

  .no-info {
    padding: 200px 0;
    text-align: center;
    font-size: 30px;
  }

  .price {
    display: block;
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: right;

    i {
      padding-left: 2px;
      font-size: 24px;
    }
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
</style>
