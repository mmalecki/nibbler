var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')
var copy = require('nibbler-copy')
var upstart = require('nibbler-upstart')

var todoService = {
  name: 'todo',
  execpath: 'iojs',
  script: '/opt/todo/server.js'
}

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
  [ upstart.install, todoService ],
  [ upstart.start, todoService ]
]
