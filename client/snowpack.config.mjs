/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
    "@snowpack/plugin-sass",
  ],
  routes: [
    { match: "routes", src: ".*", dest: "/index.html" },
  ],
  optimize: {},
  packageOptions: {},
  devOptions: {},
  buildOptions: {},
};
