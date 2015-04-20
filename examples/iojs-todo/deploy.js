var async = require('async')
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')

module.exports = [
  [ apt, {
    updateCache: true,
    state: 'present',
    pkg: ['redis-server']
  } ],
  iojs,
  copyContext
]
