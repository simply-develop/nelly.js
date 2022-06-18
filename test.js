let nelly = require('./lib/nelly')

let client = new nelly.Client()

client.login("ODQ2OTg2MjEzNzY4Mjk4NTA3.YK3fYQ.-AOOy5OTqQfxqbjwWxiVAt3Wt6Y");

client.on('ready', () => {
  client.updateStatus('idle', 1, 'nelly.js on the go')
  console.log('online')
})