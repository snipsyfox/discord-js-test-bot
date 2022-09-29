import { int } from '@test-bot/typings';
import { EmbedBuilder } from 'discord.js';
import { readFileSync, promises } from 'fs';
import { resolve } from 'path';
export function loadEnv() {
    const env: Record<string, string> = {};

    const lines = readFileSync('./.env', { encoding: 'utf-8' }).split('\n');

    for (const line of lines) {
        if (!line || !line.includes('=')) continue;
        const [name, ...value] = line.split('=');
        if (env[name]) continue;

        env[name] = value.join('=');
    }
    return env;
};
export function createRandomString(len: int) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let r = 'GENERATED_';
    for (let i = 0; i < len; i++) {
        r += chars[Math.floor(Math.random() * chars.length)];
    }

    return r;

}

export async function getFiles(dir: string, sub = true) {
    const files: string[] = [];
    if (sub) {
        const statsa = await promises.stat(resolve(dir));
        if (statsa.isDirectory()) {
            const d = await promises.readdir(dir);
            for (const s of d) {
                const stats = await promises.stat(resolve(dir, s));
                if (stats.isDirectory()) {
                    const gf = await getFiles(resolve(dir, s), sub);
                    files.push(...gf);
                } else {
                    files.push(resolve(dir, s));
                }
            }
        } else {
            files.push(dir);
        }
    }

    return files;
}

export function createEmbed() {
    return new EmbedBuilder();
}

export function parseTimeNumber(num: int) {

}