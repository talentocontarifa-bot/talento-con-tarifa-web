import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
    output: 'static',
    integrations: [
        tailwind(),
        react(),
        keystatic()
    ],
});
