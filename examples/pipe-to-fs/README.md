# iojs-todo
A simple Io.js to-do application using Redis for storage.

## Deploying to a remote server
First, get a VM. Make note of its IP and access details. Make sure that port
3000 is exposed (that's the port application listens on by default).

Then, clone the Nibbler repository (`git clone https://github.com/mmalecki/nibbler`)
and run `npm install` in `examples/iojs-todo` directory.

You can now deploy the application:

```sh
npm run deploy -- --runner ssh --ssh root@host
```

To make sure that it deployed properly:

```sh
curl host:3000
```

Now you can create:

```sh
curl host:3000/todo -XPOST -H'content-type: application/json' -d '{"todo": "Learn Nibbler"}'
```

and read to-do's:

```sh
curl host:3000/todo
```
