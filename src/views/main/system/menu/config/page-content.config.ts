export const tableConfig = {
  propList: [
    { prop: "name", label: "菜单名称", width: 150 },
    { prop: "permission", label: "权限", width: 150 },
    { prop: "type", label: "级别", width: 150, slotName: "type" },
    { prop: "createAt", label: "创建时间", width: 150, slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", width: 150, slotName: "updateAt" },
  ],
  title: '菜单列表',
  type: "index",
  treeProps: {
    'row-key': 'id',
    'tree-props': "{ children: 'children' }"
  },
}
