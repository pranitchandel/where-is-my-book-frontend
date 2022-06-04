const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("Am i here");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://where-is-my-book-services.onrender.com",
      changeOrigin: true,
    })
  );
};
