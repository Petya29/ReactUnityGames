/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        'btn': '#d200fa 8px 8px 0 0, transparent 4px 4px 0 1px',
        'btn-active': '#d200fa 0 3px 5px'
      }
    },
  },
  plugins: [],
}
