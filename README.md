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
