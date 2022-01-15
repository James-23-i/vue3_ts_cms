import { IForm } from '@/base-ui/Form/types'

export const dialogConfig: IForm = {
  labelWidth: "120px",
  layout: { span: 24 },
  itemForm: [
    {
      type: "input",
      label: "部门名称",
      placeholder: "请输入部门名称",
      field: 'name',
    },
    {
      type: "input",
      label: "领导人",
      placeholder: "请输入领导人",
      field: 'leader',
    },
  ]
}


