var copy = require('nibbler-copy')
var apt = require('nibbler-apt')

module.exports = [
  [ apt, {
    pkg: 'nginx',
    state: 'present'
  } ],
  [ copy, {
    src: __dirname + '/static',
    dest: '/usr/share/nginx/html'
  } ]
];
