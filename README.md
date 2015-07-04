# Nibbler
A minimal, modular, Node.js- and npm-based deployment system.

## Installation
```sh
npm install -g nibbler
```

Or locally, as a development dependency:

```sh
npm install --save-dev nibbler
```

## Usage
The following playbook sets a host up with Redis and io.js present, and prints
"All done" when done.

```js
var apt = require('nibbler-apt')
var iojs = require('nibbler-debian-iojs')

module.exports = [
  [ apt, {
    updateCache: true,
    state: 'present',
    pkg: ['redis-server']
  } ],
  iojs,
  "echo 'All done'"
]
```

If you want to run it against your local Debian machine, simply run (given that
your playbook file is named `playbook.js`):

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

### More examples
There are more complex examples in the [`examples`](https://github.com/mmalecki/nibbler/tree/master/examples/)
directory:

* [`iojs-todo`](https://github.com/mmalecki/nibbler/tree/master/examples/iojs-todo) - a simple Io.js to-do application.

### Runners
The only thing that Nibbler core does is provide you with a JavaScript DSL for
running actions in series, and easy execution of commands through a runner. All
the logic involved with running commands on a remote (for example, a SSH-enabled
host or a Docker container) lives in runners.

Runner is a module which receives a Nibbler context descriptor (containing
command line options, environment, whether to use `sudo` globally, etc.) and
returns a `child_process`-like API.

So, for example, the local runner is as simple as this:

```js
module.exports = function(context) {
  return require('child_process')
}
```

At the moment, the notable runners are:

* [`nibbler-runner-ssh`](https://www.npmjs.com/package/nibbler-runner-ssh) - SSH runner
* [`nibbler-runner-local`](https://www.npmjs.com/package/nibbler-runner-local) - local runner

### Useful helpers
Nibbler comes with no core modules. There are, however, numerous helpers you
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
    function(next) {
      apt({
        updateCache: true,
        state: 'present',
        pkg: ['redis-server']
      }, context, next);
    },
    function(next) {
      iojs(context, next);
    }
  ], cb)
}
```

This example has the added benefit of running all the actions in parallel.
You can run it in the same exact way.

## Rationale
I was looking for a minimal deployment tool with a way to modularize and
parametrize deployment. I've looked at several available solutions, considering
the size of the ecosystem and tool's integration with it, the module manager
and general architecture and found nothing that I liked. Specifically:

  * Ansible - to write modules (instead of roles, which are YAML) you need to
    write Python and deal with Ansible's module path. Built-in inventory support.
    Package management is for roles, not modules. YAML.

  * Chef - Ruby. Hard to reuse generic Ruby Gems because of the DSL.

  * Puppet - YAML and DSL.

So I decided to build something like that. What distinguishes Nibbler from the
rest:

  * Tight integration with the ecosystem. Nibbler uses Node.js and instead of
    creating a DSL for performing actions on remote servers, Nibbler
    uses runners, which implement Node.js `child_process` API but act on the remote.

  * npm. Nibbler and its modules are all in npm. You can install them as
    development dependencies. Nibbler modules heavily reuse existing npm modules.
    This also means no core modules - core is where modules die.
