var request = require('request')

module.exports = [
  function (context, cb) {
    request('https://github.com/mmalecki.keys')
      .pipe(context.fs.createWriteStream('/root/.ssh/authorized_keys'))
      .on('error', cb)
      .on('close', cb)
  }
]
