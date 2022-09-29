import { TestBotClient } from '../clients/TestBotClient';
import { Category } from '../utils/Category';
import { enumerable } from '../utils/decorators';
import { ModuleHandler } from './ModuleHandler';

export interface ModuleOptions {
    id: string;
    categoryId: string;

}

export class CustomModule {

    id: string;
    categoryId: string;
    category: null | Category;
    @enumerable(false)
    client!: TestBotClient;
    @enumerable(false)
    public filepath: null | string;
    @enumerable(false)
    public handler!: ModuleHandler<this>;


    constructor(options: ModuleOptions) {
        this.id = options.id;
        this.categoryId = options.categoryId || 'default';
        this.filepath = null;
        this.category = null;
    }



    reload() {

    }

    remove() { }


    toString() {
        return this.id;
    }


}