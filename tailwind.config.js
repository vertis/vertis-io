/** @type {import('tailwindcss').Config} */
export default {
   content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Freight Text Pro"', 'Spectral', 'Merriweather', 'Georgia', 'serif'],
      },
      colors: {
        ink: {
          light: '#6B7280', // Refined gray for secondary text
          DEFAULT: '#374151', // Rich gray for primary text
          dark: '#111827', // Deep gray for headings
        },
        paper: {
          light: '#FFFFFF',
          DEFAULT: '#FAFAFA',
          dark: '#F3F4F6',
        },
      },
      backgroundImage: {
        'gradient-fade': 'linear-gradient(180deg, rgb(255 255 255 / 0) 0%, rgb(255 255 255 / 100%) 100%)',
      },
    },
  },
  plugins: [],
}
