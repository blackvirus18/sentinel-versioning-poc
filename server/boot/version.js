var Version = function() {};
Version.prototype.use = function(options) {
  this._header = options.header||'accept';
  this._appversion = /version=(\d+)(,|$)/;
};
Version.prototype.reroute = function(reroute_map) {
  var header = this._header;
  var appversion = this._appversion;
  return function(req, res, next) {
    var header_value = req.headers[header];
    var match = appversion.exec(header_value);
    var path = req.path;
    var method = req.method.toLowerCase();
    var route_handler_exist = false;
    var versions = Object.keys(reroute_map).reverse();
    for (var i=0; i<versions.length; i++) {
      var version = versions[i];
      var router = reroute_map[version];
        if (match && match[1] == version) {
          route_handler_exist= true;
          return router(req, res, next);
      }
    }
    if (!route_handler_exist) {
      var latest_version= versions[0];
      var router = reroute_map[latest_version];
      return router(req, res, next);
    }
    return next();
  };
};
exports = module.exports = new Version();
