# nibbler
A deployment system that's inspired by Ansible, but is modular and harnesses
the power of npm.

## Installation
```sh
npm i nibbler
```

## Usage
The following playbook sets up a host with Redis and io.js present.

```js
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')

module.exports = [
  [ apt, {
    updateCache: true,
    state: 'present',
    pkg: ['redis-server']
  } ],
  iojs
]
```

If you want to run it against your local machine, simply run (given that your
playbook file is named `playbook.js`):

```sh
nibbler playbook.js
```

If you desire to bootstrap a remote host (all actions happen through SSH, so no
binaries are required on remote side):

```sh
nibbler --runner ssh --ssh root@122.65.21.42 playbook.js
```

### Fancying up
Handling arrays of directives isn't all that Nibbler can do. Underneath, it's
all JavaScript, and Nibbler is specifically designed so that dropping down to
it is as easy as it gets.

```js
var async = require('async')
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')
 
module.exports = function(context, cb) {
  async.parallel([
    async.apply(apt, {
      updateCache: true,
      state: 'present',
      pkg: ['redis-server']
    }, context),
    async.apply(iojs, context)
  ], cb)
}
```

This example has the added benefit of running all the actions in parallel.
You can run it in the same exact way.
