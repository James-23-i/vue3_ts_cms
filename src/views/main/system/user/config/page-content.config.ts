export const tableConfig = {
  propList: [
    { prop: "name", label: "用户名", width: 150 },
    { prop: "realname", label: "姓名", width: 150 },
    { prop: "enable", label: "状态", width: 150, slotName: "status" },
    { prop: "cellphone", label: "电话", width: 150 },
    { prop: "createAt", label: "创建时间", width: 150, slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", width: 150, slotName: "updateAt" },
    { prop: 'action', label: "操作", width: 150, slotName: "action" }
  ],
  title: '用户列表',
  type: "selection",
}
