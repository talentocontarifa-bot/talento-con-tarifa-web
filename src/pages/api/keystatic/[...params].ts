
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

// Helper to safely get env vars without crashing
const getEnv = (key: string) => {
    // Try import.meta.env first (Astro/Vite standard)
    try {
        // @ts-ignore
        if (import.meta.env[key]) return import.meta.env[key];
    } catch (e) { }

    // Try process.env second (Node.js standard)
    try {
        if (typeof process !== 'undefined' && process.env[key]) return process.env[key];
    } catch (e) { }

    return undefined;
};

export const ALL = makeHandler({
    config: {
        ...config,
        // Inject session secret safely
        secret: getEnv('KEYSTATIC_SECRET') || config.secret,
        storage: {
            ...config.storage,
            // Force injection of GitHub creds safely
            clientId: 'Ov23liEDYhi9gO079O7K',
            clientSecret: config.storage.kind === 'github'
                ? (getEnv('GH_CLIENT_SECRET') || getEnv('KEYSTATIC_GITHUB_CLIENT_SECRET') || config.storage.clientSecret)
                : config.storage.clientSecret,
        } as any
    },
});
