import { IForm } from '@/base-ui/Form/types'

export const dialogConfig: IForm = {
  labelWidth: "120px",
  layout: { span: 24 },
  itemForm: [
    {
      type: "input",
      label: "用户名",
      placeholder: "请输入用户名",
      field: 'name',
    },
    {
      type: "input",
      label: "真实姓名",
      placeholder: "请输入真实姓名",
      field: 'realname',
    },
    {
      type: "password",
      label: "密码",
      placeholder: "请输入密码",
      field: 'password',
      hidden: false
    },
    {
      type: "input",
      label: "电话号码",
      field: 'cellphone',
    },
    {
      type: "select",
      label: "所属部门",
      placeholder: "请选择所属部门",
      field: 'departmentId',
      option: []
    },
    {
      type: "select",
      label: "角色",
      placeholder: "请选择角色",
      field: 'roleId',
      option: []
    },
  ]
}


