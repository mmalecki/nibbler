var async = require('async')
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')

module.exports = function(context, cb) {
  async.series([
    async.apply(apt, {
      updateCache: true,
      state: 'present',
      pkg: ['redis-server']
    }, context),
    async.apply(iojs, context)
  ], cb)
}

module.exports = [
  [ apt, {
    updateCache: true,
    state: 'present',
    pkg: ['redis-server']
  } ],
  iojs
]
