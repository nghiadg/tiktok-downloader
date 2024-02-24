/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6C5CE7",
        "primary-light": "#6c5ce71c",
      },
      boxShadow: {
        c0: "rgba(149, 157, 165, 0.2) 0px 8px 24px;",
      },
    },
  },
  plugins: [],
};
