
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

export const ALL = makeHandler({
    config: {
        ...config,
        // Inject session secret at runtime
        secret: process.env.KEYSTATIC_SECRET || config.secret,
        storage: {
            ...config.storage,
            // Force injection of GitHub creds at runtime
            clientId: 'Ov23liEDYhi9gO079O7K',
            clientSecret: config.storage.kind === 'github'
                ? (process.env.GH_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || config.storage.clientSecret)
                : config.storage.clientSecret,
        } as any
    },
});
