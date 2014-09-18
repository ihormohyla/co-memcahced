var memcached = require('./index');
var co = require('co');


co(function* () {
    var key = 'test';
    yield memcached.set(key, 7, 3600);
    var get  = yield memcached.get(key);
    console.log('get--->>>', get);

    var del  = yield memcached.delete(key);

    var get  = yield memcached.get(key);
    console.log('get--->>>', get);

})();


