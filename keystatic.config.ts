import { config, fields, collection } from '@keystatic/core';

// Safe environment variable retrieval
const getEnv = (key: string) => {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
        return import.meta.env[key];
    }
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
        return process.env[key];
    }
    return undefined;
};

export default config({
    storage: import.meta.env.DEV
        ? { kind: 'local' }
        : {
            kind: 'github',
            repo: {
                owner: 'talentocontarifa-bot',
                name: 'talento-con-tarifa-web',
            },
            clientId: 'Ov23liEDYhi9gO079O7K',
            clientSecret: getEnv('GH_CLIENT_SECRET') || getEnv('KEYSTATIC_GITHUB_CLIENT_SECRET'),
            secret: getEnv('KEYSTATIC_SECRET'),
        },
    collections: {
        posts: collection({
            label: 'Intel (Blog)',
            slugField: 'title',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Título' } }),
                description: fields.text({ label: 'Descripción Corta', multiline: true }),
                pubDate: fields.date({ label: 'Fecha de Publicación' }),
                featured: fields.checkbox({ label: 'Destacar en Home', defaultValue: false }),
                tags: fields.array(
                    fields.text({ label: 'Etiqueta' }),
                    { label: 'Tags', itemLabel: props => props.value }
                ),
                content: fields.document({
                    label: 'Contenido',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
    },
});
