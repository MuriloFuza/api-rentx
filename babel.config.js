module.exports = {
  presets: [
    ["@babel/preset-env", {targets: {node: "current"}}],
    "@babel/preset-typescript"
  ],
  plugins:[
    [
      "module-resolver",
      {
        alias:{
          "@modules/*":["./scr/modules"],
          "@config/*":["./scr/config"],
          "@shared/*":["./scr/shared"],
          "@errors/*":["./scr/errors"],
          "@utils/*":["./scr/utils"]
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", {legacy: true}],
    ["@babel/plugin-proposal-class-properties", {loose: true}],
  ],
};