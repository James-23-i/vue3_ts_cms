
// 登录时传递参数
export interface ILogin {
  name: string
  password: string
}

// 登录后返回的参数
export interface ILoginObj {
  name: string
  id: number
  token: string
}



