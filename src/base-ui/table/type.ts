type TProp = { prop: string, label: string, width: number, slotName?: string }
type TBtn = { text: string, cb: () => any, loading?: boolean }

export interface ITable {
  propList: TProp[]
  type: string
  btn: TBtn
  handleSelection: () => any
  onEdit?: () => any
  onDel?: () => any
}

