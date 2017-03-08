import { Module } from 'magnet-core/module'
import * as david from 'david'

import defaultConfig from './config/david'

export default class David extends Module {
  davidConfig: any

  async setup () {
    this.davidConfig = this.prepareConfig('david', defaultConfig)

    const manifest = require(`${this.config.baseDirPath}/package.json`)
    david.getUpdatedDependencies(manifest, this.davidConfig, (er, deps) => {
      // this.log.info('latest dependencies information for', manifest.name)
      this.listDependencies(deps)
    })

    // david.getDependencies(manifest, this.davidConfig, (er, deps) => {
    //   this.log.info('latest devDependencies information for', manifest.name)
    //   this.listDependencies(deps)
    // })
  }

  listDependencies (deps) {
    Object.keys(deps).forEach((depName) => {
      if (this.davidConfig.skips.includes(depName)) { return }
      var required = deps[depName].required || '*'
      var stable = deps[depName].stable || 'None'
      var latest = deps[depName].latest
      this.log.warn('David: %s Required: %s Stable: %s Latest: %s', depName, required, stable, latest)
    })
  }
}
