/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ADLaM: ["ADLaM Display"],
        satoshi: "Satoshi-Regular",
        fraunces: "Fraunces, serif",
        lato: "Lato, sans-serif",
        dmSans: "DM Sans, sans-serif !important",
        pacifico: "Pacifico, cursive",
        fontAwesome: "Font Awesome 6 Free",
        poppins: "Poppins, sans-serif",
        spectral: "Spectral, serif",
        quicksand: "Quicksand, sans-serif",
        lora: "Lora, serif",
        urbanist: "Urbanist, sans-serif",
        inter: "Inter",
      },
      colors: {
        primary: "#ff4000",
        secondary: "#494949",
        tertiary: "#F58434",
      },
      screens: {
        xs: "400px",
      },
      backgroundImage: {
        "hero-product": "url('/images/social-cut-aXJdmnxauwY-unsplash.jpg')",
        "login-img": "url('/images/login-img.jpg')",
        "register-img": "url('/images/register-smile.jpg')",
        "forgot-img": "url('/images/forgot-pass.jpg')",
        login:
          "linear-gradient(rgb(38 25 51 / 70%),rgb(25 25 51 / 70%)),url(/images/1.jpg)",
        overlay: "linear-gradient(rgb(38 25 51 / 80%),rgb(25 25 51 / 80%))",
        onboard:
          "linear-gradient(rgb(38 25 51 / 70%),rgb(25 25 51 / 70%)), url('/images/3.jpg')",
        reset:
          "linear-gradient(rgb(38 25 51 / 70%),rgb(25 25 51 / 70%)), url('/images/5.jpg')",
        forget:
          "linear-gradient(rgb(38 25 51 / 70%),rgb(25 25 51 / 70%)), url('/images/7.jpg')",
      },
    },
  },
  plugins: [],
};
