# nibbler
A deployment system that's inspired by Ansible, but is modular and harnesses
the power of npm.

## Installation
```sh
npm install nibbler
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
npm install nibbler-runner-local nibbler-apt nibbler-debian-iojs
nibbler playbook.js
```

If you desire to bootstrap a remote host (all actions happen through SSH, so no
binaries are required on remote side):

```sh
npm install nibbler-runner-ssh nibbler-apt nibbler-debian-iojs
nibbler --runner ssh --ssh root@122.65.21.42 playbook.js
```

### Useful helpers
Nibbler comes with no "core modules". There are, however, numerous helpers you
can use:

* [`nibbler-exec`](https://www.npmjs.com/package/nibbler-exec) - for executing commands
  with regard for global `sudo`
* [`nibbler-apt`](https://www.npmjs.com/package/nibbler-apt) - for managing Apt packages
* [`nibbler-copy`](https://www.npmjs.com/package/nibbler-copy) - for copying
  local directories and files
* [`nibbler-debian-iojs`](https://www.npmjs.com/package/nibbler-debian-iojs) -
  for installing io.js on a Debian host

### Fancying up
Handling arrays of directives isn't all that Nibbler can do. Underneath, it's
all JavaScript, and Nibbler is specifically designed so that dropping down to
it is as easy as it gets.

If `module.exports` of your playbook is a function, Nibbler will call it with
the context object and a callback. The context object looks as follows:

* `runner` - a `child_process`-like API provided by your runner of choic
* `sudo` - a `Boolean` indicating whether user requested global sudo

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
