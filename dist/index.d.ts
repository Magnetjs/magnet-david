import { Module } from 'magnet-core/module';
export default class MagnetDavid extends Module {
    readonly moduleName: string;
    readonly defaultConfig: string;
    setup(): Promise<void>;
    listDependencies(deps: any): void;
}
