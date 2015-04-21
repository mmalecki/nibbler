var async = require('async')
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')
var copy = require('nibbler-copy')
var upstart = require('nibbler-upstart')

module.exports = [
  [ apt, {
    updateCache: true,
    state: 'present',
    pkg: ['redis-server']
  } ],
  iojs,
  [ copy, {
    src: __dirname,
    dest: '/opt/todo'
  } ],
  [ upstart.install, {
    name: 'todo',
    execpath: 'iojs',
    script: '/opt/todo/server.js'
  } ],
  [ upstart.start, {
    name: 'todo'
  } ]
]
