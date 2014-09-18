var Memcached = require('memcached');
var config = require('config');

module.exports = function(options){
    var memcachedHost = (options.host || config.memcached.host || 'localhost') + ':' + (options.port || config.memcached.port || 11211);
    var client = new Memcached(memcachedHost, (options.options || config.memcached.options));

    var store = {
        get : function (key) {
            return function(fn){
                client.get(key, function (err, data) {
                    if (err) return fn(err);
                    return fn(null, data);
                });
            }
        },
        set : function (key, data, time) {
            return function(fn){
                client.set(key, data, time, function (err) {
                    if (err) return fn(err);
                    fn();
                });
            }
        },
        delete :function (key) {
            return function(fn){
                client.delete(key,function (err) {
                    if (err) return fn(err);
                    fn();
                });
            }
        }
    };
    return store;

};

//module.exports =
//};


