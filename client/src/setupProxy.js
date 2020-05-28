const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    console.log('here')
    app.use(proxy('/api/', { target: 'http://40.121.180.62:3001/' }));
};