
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

export const ALL = makeHandler({
    config: {
        ...config,
        storage: {
            ...config.storage,
            // @ts-ignore - Inject secret at runtime where process.env follows Node.js conventions
            clientSecret: config.storage.kind === 'github'
                ? (process.env.GH_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || config.storage.clientSecret)
                : config.storage.clientSecret,
        } as any
    },
});
