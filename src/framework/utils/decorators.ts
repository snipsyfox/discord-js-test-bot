/*
 * 
 # The MIT License (MIT)

Copyright © `2020` `The Sapphire Community and its contributors`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

 */

import { createRandomString } from './functions';

export function createMethodDecorator(fn: MethodDecorator) {
    return fn;
}

/** 
 * 
 * @copyright sapphiredev 
 */
export function createFunctionCondition(
    pre: (...args: unknown[]) => boolean | Promise<boolean>,
    fallback: (...args: unknown[]) => unknown,
) {
    return createMethodDecorator((_target, _key, descriptor) => {
        const meth = descriptor.value;
        if (!meth) throw new Error('no function passed to conditional decorator');
        if (typeof meth !== 'function') {
            throw new Error('function precondition can only be applied to functions');
        }
        descriptor.value = async function value(
            this: (...args: any[]) => any,
            ...args: any[]
        ) {
            const can = await pre(...args);
            return can ? meth.call(this, ...args) : fallback.call(this, ...args);
        } as unknown as undefined;
    });

}

export function createPropertyDecorator(
    fn: (target: Object, propertyKey: string | symbol) => void
) {
    return fn;
}

export function createclassDecorator(fn: (target: any) => any) {
    return fn;
}

export function createArgumentDecorator(fn: ParameterDecorator) {
    return fn;
}

export function enumerable(val: boolean) {
    return createPropertyDecorator((target: any, property) => {
        Object.defineProperty(target, property, {
            configurable: true,
            writable: true,
            enumerable: val,
            set: (value: unknown) => {
                Object.defineProperty(target, property, {
                    enumerable: val,
                    writable: true,
                    configurable: true,
                    value
                });
            }
        });
    });
}

export function customId() {
    return createclassDecorator((cls: any): any => {
        abstract class Extended extends cls {
            id = `${createRandomString(5).toUpperCase()}_${cls.name}`;
        }
        return Extended;
    });
}
