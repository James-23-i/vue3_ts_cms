import utils from '@/utils/tools'
import { App } from 'vue'

export function globalUtils(app: App) {
  app.config.globalProperties.$utils = utils
}
