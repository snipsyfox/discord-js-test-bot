import { ClientOptions, Partials, Options } from 'discord.js';
import { loadEnv } from '../utils/functions';


export const testEnv = loadEnv();


export const clientOptions: ClientOptions = {
    allowedMentions: {
        repliedUser: false,
        parse: ['users'],
    },
    failIfNotExists: true,
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
    ],
    //TODO: only cache what we actually need
    makeCache: Options.cacheEverything(),
    shards: 'auto',
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildBans',
        'GuildEmojisAndStickers',
        'GuildIntegrations',
        'GuildWebhooks',
        'GuildInvites',
        'GuildVoiceStates',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildMessageTyping',
        'DirectMessages',
        'DirectMessageReactions',
        'DirectMessageTyping',
        'MessageContent',
        'GuildScheduledEvents'

    ]
};

export class BashColours {

    static _reset = '\u001B[0m';

    static get reset() {
        return this._reset;
    }
    static _black = '\u001B[30m';
    static black(text: string) {
        return `${this._black}${text}${this._reset}`;
    }
    static _red = '\u001B[31m';
    static red(text: string) {

        return `${this._red}${text}${this._reset}`;
    }
    static _green = '\u001B[32m';
    static green(text: string) {
        return `${this._green}${text}${this._reset}`;
    }

    static _greenBold = '\u001B[1;32m';

    static greenBold(text: string) {
        return `${this._greenBold}${text}${this.reset}`;
    }

    static _yellow = '\u001B[33m';

    static yellow(text: string) {
        return `${this._yellow}${text}${this._reset}`;
    }

    static _yellowBold = '\u001B[1;33m';

    static yellowBold(text: string) {
        return `${this._yellowBold}${text}${this.reset}`;
    }

    static _blue = '\u001B[34m';
    static blue(text: string) {
        return `${this._blue}${text}${this._reset}`;
    }
    static _purple = '\u001B[35m';

    static purple(text: string) {
        return `${this._purple}${text}${this._reset}`;
    }
    static _cyan = '\u001B[36m';

    static cyan(text: string) {
        return `${this._cyan}${text}${this._reset}`;
    }

    static _white = '\u001B[37m';

    static white(text: string) {
        return `${this._white}${text}${this._reset}`;
    }

    static _bold = '\u001B[1;37m';

    static bold(text: string) {
        return `${this._bold}${text}${this._reset}`;
    }


}