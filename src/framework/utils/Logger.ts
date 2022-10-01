import { int } from '@test-bot/typings';
import { regexes } from '../../events/client/debug';
import { BashColours } from './constants';
import * as fns from './functions';

function getMaxLeng() {
    let long: int = 0;
    const s = ['LOG', 'INFO', 'DEBUG'];
    for (const st of s) {
        if (st.length > long) {
            long = st.length;
        }
    }
    return long;
}

const colors = {
    LOG: (text: string) => BashColours.greenBold(text),
    ERROR: (text: string) => BashColours.red(text),
    INFO: (text: string) => BashColours.cyan(text),
    DEBUG: (text: string) => BashColours.yellow(text)
};


export class Logger {

    public log({
        message,
        type = 'LOG',
        shard = 0
    }: {
        message: string;
        type?: 'LOG' | 'INFO' | 'DEBUG' | 'ERROR';
        shard?: int;
    }) {

        const rest = getMaxLeng() - type.length;

        const ntype = `${type}${rest ? ' '.repeat(rest) : ''}`;

        return console.log(colors[type](
            `[${this.getTime()}] [Shard #${shard}] ${ntype} :: ${message} `
        ));
    }

    public error({
        error,
        shard
    }: {
        error: Error;
        shard: int;
    }) {

        if (error.stack) {
            const lines = error.stack.split(/\n/g);
            for (const line of lines) {
                this.log({
                    message: line.replace(regexes.SPACES, ''),
                    type: 'ERROR',
                    shard
                });
            }
        } else {
            return this.log({
                message: `${error.stack}`,
                type: 'ERROR',
                shard
            });
        }
    }


    public debug({
        message,
        shard = 0
    }: {
        message: string;
        shard?: number;
    }) {

        if (process.env.NODE_ENV === 'dev') {
            return this.log({ message, type: 'DEBUG', shard });
        }
    }


    public getTime() {
        const time = new Date();

        return [
            `${fns.parseTimeNumber(time.getHours())}`,
            `${fns.parseTimeNumber(time.getMinutes())}`
        ].join(':');
    }


};;;