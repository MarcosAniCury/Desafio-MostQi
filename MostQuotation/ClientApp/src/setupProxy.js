const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:44436',
        secure: false
    });

    app.use(appProxy);
};
