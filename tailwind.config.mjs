/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'brand-yellow': '#CCFF00', // El amarillo chillante icónico de talentocontarifa.lat
                'brand-dark': '#050510',
                'brand-gray': '#F0F0F0',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Space Grotesk', 'Outfit', 'sans-serif'],
                mono: ['Share Tech Mono', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
                'brutal': '6px 6px 0px 0px rgba(0,0,0,1)',
                'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
                'brutal-xl': '12px 12px 0px 0px rgba(0,0,0,1)',
                'brutal-yellow': '6px 6px 0px 0px #CCFF00',
            },
            animation: {
                'marquee': 'marquee 22s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
