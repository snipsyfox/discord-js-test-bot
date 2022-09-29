import * as fns from './functions';
export class Logger {


    public log(message: string, type: 'LOG' | 'INFO' | 'DEBUG' = 'LOG') {
        return console.log(`[${this.getTime()}] ${type} :: ${message}`);
    }

    public debug(message: string) {
        return this.log(message, 'DEBUG');
    }


    public getTime() {
        const time = new Date();

        return [
            `${fns.parseTimeNumber(time.getHours())}`,
            `${fns.parseTimeNumber(time.getMinutes())}`
        ].join(':');
    }


}