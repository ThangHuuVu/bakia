const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        content: "calc(100vh - 3.5rem)",
        "content-sm": "calc(100vh - 6rem)",
        "header-sm": "21.875rem",
      },
      colors: {
        main: "#3EFFA8",
        mediumMint: "#2ED98C",
        darkMint: "#21AF6F",
        mainGray: "#4D5254",
        background: "#F7F5F4",
        altGrey: "#768489",
        error: "#FF3C3C",
      },
      fontSize: {
        s3: "0.8125rem",
        h2: "1.625rem",
      },
      lineHeight: {
        h2: "1.875rem",
      },
      fontFamily: {
        s3: ['"Bai Jamjuree"', ...defaultTheme.fontFamily.sans],
      },
      backgroundOpacity: {
        24: "0.24",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // firefox variant
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`;
        });
      });
    }),
  ],
};
