/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                primary: '#9c46f6',
                secondary: '#8c3cec',
                white: '#ffffff',
                border: '#e5e7eb',
                text: '#030508',
            },
            boxShadow: {
                button: '0 0 0 0.5px rgba(0, 0, 0, .08), 0 1px 0 rgba(0, 0, 0, .06), 0 1px 2px rgba(0, 0, 0, .05), 0 2px 4px rgba(0, 0, 0, .04), 0 4px 8px rgba(0, 0, 0, .03), 0 2px 2px rgba(0, 0, 0, .02), inset 0 0 2px 1px #fff, inset 0 1px 0 hsla(0, 0%, 100%, .94), inset 0 1px 0 #fff',
                input: 'rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px, rgba(61, 59, 53, 0.08) 0px 2px 5px 0px',
                'input-focus':
                    '#8c3cec5c 0px 0px 0px 3px, rgba(61, 59, 53, 0.16) 0px 0px 0px 1px',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')]
};
