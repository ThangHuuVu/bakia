const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {},
      height: {
        content: "calc(100vh - 3.5rem)",
      },
      width: {
        content: "calc(100vw - 1rem)"
      },
      maxWidth: {
        content: "69.375rem",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      padding: {
        content: "calc((100vw - 69.375rem)/2) ",
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
        body: ['"Bai Jamjuree"', ...defaultTheme.fontFamily.sans],
      },
      backgroundOpacity: {
        24: "0.24",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "900",
              fontStyle: "italic",
              fontSize: "2.25rem",
              textTransform: "uppercase",
              lineHeight: "2.625rem",
              padding: 0,
              margin: 0,
            },
            h2: {
              fontWeight: "900",
              fontStyle: "italic",
              fontSize: "1.625rem",
              textTransform: "uppercase",
              lineHeight: "1.875rem",
              padding: 0,
              margin: 0,
            },
            h3: {
              fontWeight: "900",
              fontStyle: "italic",
              fontSize: "1rem",
              textTransform: "uppercase",
              lineHeight: "1.25rem",
              padding: 0,
              margin: 0,
            },
            p: {
              fontWeight: "normal",
              fontStyle: "normal",
              fontSize: "1rem",
              fontFamily: "Bai Jamjuree",
              fontColor: theme("color.altGrey"),
              lineHeight: "1.375rem",
              padding: 0,
              margin: 0,
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
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
