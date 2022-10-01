import { TestBotClient } from '../clients/TestBotClient';
import { Category } from '../utils/Category';
import { customId } from '../utils/decorators';
import { createRandomString } from '../utils/functions';
import { ModuleHandler } from './ModuleHandler';

export interface ModuleOptions {
    id?: string;
    categoryId: string;

}

export class CustomModule<Handler extends ModuleHandler<any, any>> {

    id: string;
    categoryId: string;
    category: null | Category;
    client!: TestBotClient;
    public filepath: null | string;
    public handler!: Handler;


    constructor(options: ModuleOptions) {
        this.id = options.id || createRandomString(15);
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


    static customId() {
        return customId();
    }


}
