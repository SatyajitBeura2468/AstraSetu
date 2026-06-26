const fromFileUrl = (url) =>
  decodeURIComponent(url.pathname).replace(/^\/([A-Za-z]:)/, "$1");

const config = {
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "react",
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/tests/setup.ts"],
    coverage: {
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": fromFileUrl(new URL("./src", import.meta.url)),
    },
  },
};

export default config;
