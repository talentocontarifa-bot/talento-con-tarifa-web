
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

export const ALL = async (context: any) => {
    // Runtime Injection Strategy
    const secret = process.env.KEYSTATIC_SECRET || config.secret;

    // Try to find GH secret
    const ghSecret = process.env.GH_CLIENT_SECRET
        || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET
        || (config.storage && 'clientSecret' in config.storage ? config.storage.clientSecret : '');

    // Log what we found
    console.log('[KEYSTATIC] Runtime Check:');
    console.log(' - Secret:', secret ? 'OK' : 'MISSING');
    console.log(' - GH Secret:', ghSecret ? 'OK' : 'MISSING');

    const handler = makeHandler({
        config: {
            ...config,
            secret,
            storage: {
                ...config.storage,
                clientId: 'Ov23liEDYhi9gO079O7K',
                clientSecret: ghSecret,
            } as any
        }
    });

    return handler(context);
};
