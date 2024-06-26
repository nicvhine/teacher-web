module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"]
          },
          useBuiltIns: "usage",
          corejs: 3
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties"
    ]
  };
  