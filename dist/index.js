"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const module_1 = require("magnet-core/module");
const david = require("david");
const david_1 = require("./config/david");
class David extends module_1.Module {
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            this.davidConfig = this.prepareConfig('david', david_1.default);
            const manifest = require(`${this.config.baseDirPath}/package.json`);
            david.getUpdatedDependencies(manifest, this.davidConfig, (er, deps) => {
                // this.log.info('latest dependencies information for', manifest.name)
                this.listDependencies(deps);
            });
            // david.getDependencies(manifest, this.davidConfig, (er, deps) => {
            //   this.log.info('latest devDependencies information for', manifest.name)
            //   this.listDependencies(deps)
            // })
        });
    }
    listDependencies(deps) {
        Object.keys(deps).forEach((depName) => {
            if (this.davidConfig.skips.includes(depName)) {
                return;
            }
            var required = deps[depName].required || '*';
            var stable = deps[depName].stable || 'None';
            var latest = deps[depName].latest;
            this.log.warn('David: %s Required: %s Stable: %s Latest: %s', depName, required, stable, latest);
        });
    }
}
exports.default = David;
//# sourceMappingURL=index.js.map