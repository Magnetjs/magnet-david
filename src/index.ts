import { Module } from 'magnet-core/module'
import * as david from 'david'

export default class MagnetDavid extends Module {
  get moduleName () { return 'david' }
  get defaultConfig () { return __dirname }

  async setup () {
    const path = this.config.packageJsonPath  this.app.config.baseDirPath
    const manifest = require(`${path}/package.json`)
    david.getUpdatedDependencies(manifest, this.config, (er, deps) => {
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
      if (this.config.skips.includes(depName)) { return }
      var required = deps[depName].required || '*'
      var stable = deps[depName].stable || 'None'
      var latest = deps[depName].latest
      this.log.warn('David: %s Required: %s Stable: %s Latest: %s', depName, required, stable, latest)
    })
  }
}
