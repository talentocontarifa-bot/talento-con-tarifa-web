
import { makeHandler } from '@keystatic/astro/api';
import config from '../../../../keystatic.config';

export const prerender = false;

// Debug logging wrapper
const handler = makeHandler({
    config,
});

export const ALL = async (context: any) => {
    console.log('--- KEYSTATIC DEBUG START ---');
    console.log('Request Method:', context.request.method);
    console.log('Request URL:', context.request.url);

    const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID || process.env.KEYSTATIC_GITHUB_CLIENT_ID;
    const clientSecret = import.meta.env.KEYSTATIC_GITHUB_CLIENT_SECRET || process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
    const secret = import.meta.env.KEYSTATIC_SECRET || process.env.KEYSTATIC_SECRET;

    console.log('ENV: HANDLER CHECK');
    console.log('Has Client ID:', !!clientId, clientId ? `(Length: ${clientId.length})` : '');
    console.log('Has Client Secret:', !!clientSecret, clientSecret ? `(Length: ${clientSecret.length})` : '');
    console.log('Has Encryption Secret:', !!secret);

    if (clientSecret) {
        console.log('Client Secret first 3 chars:', clientSecret.substring(0, 3));
        console.log('Client Secret last 3 chars:', clientSecret.substring(clientSecret.length - 3));
    }

    try {
        const response = await handler(context);
        console.log('Handler response status:', response.status);
        console.log('--- KEYSTATIC DEBUG END ---');
        return response;
    } catch (error) {
        console.error('KEYSTATIC HANDLER ERROR:', error);
        return new Response(JSON.stringify({ error: String(error) }), { status: 500 });
    }
};
