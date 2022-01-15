// 配置该模块下的一下校验规则
const infoRules = {
  name: [
    {
      required: true,
      message: 'Please enter name',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 8,
      message: 'Length should be 3 to 5',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please enter password',
      trigger: 'blur',
    },
    {
      min: 3,
      max: 6,
      message: 'Length should be 3 to 5',
      trigger: 'blur',
    },
  ],
}

const phoneRules = {
  num: [
    {
      required: true,
      message: 'Please enter phone',
      trigger: 'blur',
    },
    {
      min: 11,
      max: 11,
      message: 'Length should be 11',
      trigger: 'blur',
    },
  ],
  verify: [
    {
      required: true,
      message: 'Please enter verify',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 6,
      message: 'Length should be 6',
      trigger: 'blur',
    },
  ],
}

export { infoRules, phoneRules }
