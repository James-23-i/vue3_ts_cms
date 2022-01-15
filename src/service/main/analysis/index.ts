import YhRequest from '../../index'
import { IData } from '../../actionType'

// 每个分类商品的个数
export function getGoodsCount() {
  return YhRequest.get<IData>({
    url: '/goods/category/count',
    showLoading: false
  })
}
// 每个分类商品的销量
export function getGoodsSale() {
  return YhRequest.get<IData>({
    url: '/goods/category/sale',
    showLoading: false
  })
}
// 每个分类商品的收藏
export function getGoodsFavor() {
  return YhRequest.get<IData>({
    url: '/goods/category/favor',
    showLoading: false
  })
}
// 销量前10的商品数量
export function getGoodsSaleTopTen() {
  return YhRequest.get<IData>({
    url: '/goods/sale/top10',
    showLoading: false
  })
}
// 不同城市的销量数据
export function getGoodsAddress() {
  return YhRequest.get<IData>({
    url: '/goods/address/sale',
    showLoading: false
  })
}
// 商品数据统计的数量
export function getGoodsAmount() {
  return YhRequest.get<IData>({
    url: '/goods/amount/list',
    showLoading: false
  })
}


