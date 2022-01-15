import { IForm } from '@/base-ui/Form/types'

export const formConfig: IForm = {
  labelWidth: "120px",
  layout: {
    span: 8,
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 24
  },
  itemForm: [
    {
      type: "input",
      label: "角色",
      placeholder: "请输入角色",
      field: 'name',
    },
  ]
}


