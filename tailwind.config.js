/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          load: {
            blueHeader: "#012970",
            blue: "#1E40AF",
            saveGreen: "#5FA347",
            green: "#5FA347",
            red: "#D42F2F",
            closeRed: "#D42F2F",
            yellow: "#FBBF24",
          },
          green:"#A5D095"
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  editor: {
    // Configuración para el autocompletado de Tailwind CSS en VSCode
    suggest: {
      // Habilitar autocompletado incluso sin usar 'class' o 'className'
      completions: [
        // Autocompletar clases en propiedades específicas
        {
          match: "\\b(background|border|text)-[a-z\\d-_]*$",
          use: "your-tailwind-classnames-file",
        },
        // Autocompletar clases en todas las propiedades
        {
          match: "\\b[^\\s]+$",
          use: "your-tailwind-classnames-file",
        },
      ],
    },
  },
};

export default config;