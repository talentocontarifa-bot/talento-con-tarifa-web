
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

export const ALL = async (context: any) => {
    // 1. Definite safe retrieval of env vars
    const ghSecret = process.env.GH_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
    const kSecret = process.env.KEYSTATIC_SECRET;

    // 2. Debug logs - Visible in Vercel Function Logs
    console.log('[KEYSTATIC_DEBUG] Starting API Request');
    console.log('[KEYSTATIC_DEBUG] Env Check - GH_SECRET:', ghSecret ? 'Exists (Hidden)' : 'MISSING');
    console.log('[KEYSTATIC_DEBUG] Env Check - KEYSTATIC_SECRET:', kSecret ? 'Exists (Hidden)' : 'MISSING');

    // 3. Construct clean config object
    // We reuse collections/ui from file, but FORCE storage definition
    const runtimeConfig = {
        ...config,
        secret: kSecret || config.secret,
        storage: {
            kind: 'github',
            repo: {
                owner: 'talentocontarifa-bot',
                name: 'talento-con-tarifa-web',
            },
            clientId: 'Ov23liEDYhi9gO079O7K',
            // DIAGNOSTIC HARDCODE: Force the secret directly to bypass env var issues
            clientSecret: '82f77a2396297365e8a2744e9c5a443da8725966',
        },
    } as any;

    console.log('[KEYSTATIC_DEBUG] Config Storage Kind:', runtimeConfig.storage.kind);
    console.log('[KEYSTATIC_DEBUG] Config ClientID:', runtimeConfig.storage.clientId);

    // 4. Create and execute handler
    try {
        const handler = makeHandler({ config: runtimeConfig });
        return await handler(context);
    } catch (err) {
        console.error('[KEYSTATIC_CRITICAL_ERROR]', err);
        return new Response(JSON.stringify({
            message: 'Keystatic Setup Error',
            details: String(err)
        }), { status: 500 });
    }
};
