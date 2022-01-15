// 公有组件内部定义不同的类型
type itemType = 'input' | 'select' | 'password' | 'datePicker'
type selectOption = { label: string | number, value: string | number }

export interface ItemForm {
  type: itemType
  label: string
  field: string
  hidden?: boolean
  rules?: []
  placeholder?: string
  option?: selectOption[] // select选择器
  otherOption?: any // 时间选择器
}

// 统一合并
export interface IForm {
  itemForm: ItemForm[]
  labelWidth: string
  layout: any
}



