module.exports = {
    server: {
        command: 'node tests/server.js',
        port: process.env.PORT || 3000,
    },
    launch: {
        devtools: true,
        dumpio: false,
        // headless: process.env.HEADLESS !== 'false',
    },
};
