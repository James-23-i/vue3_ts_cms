export const tableConfig = {
  propList: [
    { prop: "name", label: "角色", width: 150 },
    { prop: "intro", label: "领导人", width: 150 },
    { prop: "createAt", label: "创建时间", width: 150, slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", width: 150, slotName: "updateAt" },
    { prop: 'action', label: "操作", width: 150, slotName: "action" }
  ],
  title: '角色列表',
  type: "index",
}
