var version = require('./version');
module.exports = function(server) {
  // Install a `/` route that returns server status
  version.use({
    'header': 'accept',
    'grab': /version=(\d+)(,|$)/,
    'error': 406,
  });
  var router = server.loopback.Router();
  router.all('/helloworld',
       version.reroute({
         1: function(req, res, next) { res.json('deepesh1'); },
         2: function(req, res, next) { res.json('deepesh2'); },
       })
   );
  console.log(version);
  server.use(router);
};
