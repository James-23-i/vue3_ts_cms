import { IForm } from '@/base-ui/Form/types'

export const dialogConfig: IForm = {
  labelWidth: "120px",
  layout: { span: 24 },
  itemForm: [
    {
      type: "input",
      label: "角色",
      placeholder: "请输入角色",
      field: 'name',
    },
    {
      type: "input",
      label: "角色介绍",
      placeholder: "请输入角色介绍",
      field: 'intro',
    },
  ]
}


