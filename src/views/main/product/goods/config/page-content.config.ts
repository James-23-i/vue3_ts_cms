export const tableConfig = {
  propList: [
    { prop: "name", label: "商品名称", width: 150 },
    { prop: "newPrice", label: "商品价格", width: 150 },
    { prop: "saleCount", label: "销售数量", width: 150},
    { prop: "imgUrl", label: "商品图片", width: 150, slotName: 'image'},
    { prop: "address", label: "地址", width: 150 },
    { prop: "status", label: "状态", width: 150, slotName: 'status' },
    { prop: "createAt", label: "创建时间", width: 150, slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", width: 150, slotName: "updateAt" },
    { prop: 'action', label: "操作", width: 150, slotName: "action" }
  ],
  title: '商品列表',
  type: "selection",
  btn: [
    { text: '新增用户', cb: 'onAdd', loading: false },
  ],
}
