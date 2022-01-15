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
      type: "select",
      label: "状态",
      placeholder: "请选择状态",
      option: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ],
      field: 'enable',
    },
    {
      type: "datePicker",
      label: "创建日期",
      field: 'time',
      otherOption: {
        type: "daterange",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间"
      }
    }
  ]
}


