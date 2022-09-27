import { readFileSync } from 'fs';
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