import { App } from 'vue'
import { regComponent } from './registerPlus'
import { globalUtils } from './utils'

export function globalFunc(app: App): void {
  regComponent(app)
  globalUtils(app)
}
