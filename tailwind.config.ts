import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(180deg, #D3D1D1 0%, rgba(203, 200, 200, 0.00) 100%)',
      },
      zIndex: {
        '100': '100',
      },
      spacing: {
        25: '6.25', // 100px
        80: '20rem', // 320px
        100: '25rem' // 400px
      },
      fontFamily: {
        'futura': ['Futura', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
