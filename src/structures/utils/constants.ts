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