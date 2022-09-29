import { TestBotClient } from './structures/clients/TestBotClient';

declare global {
    type int = number;
}


async function main() {
    const client = new TestBotClient();
    client.events.setEmitters({
        client: client,
        events: client.events,
    });
    await client.events.loadAll();
    await client.login();
}

main().catch(console.error);