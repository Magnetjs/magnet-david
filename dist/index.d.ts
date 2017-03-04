import { Module } from 'magnet-core/module';
export default class David extends Module {
    davidConfig: any;
    setup(): Promise<void>;
    listDependencies(deps: any): void;
}
