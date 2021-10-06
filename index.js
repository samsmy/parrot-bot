var SlackBot = require('slackbots');
var request = require("request");

const envKey = process.env.JOKES_BOT_TOKEN
var bot = new SlackBot({
  token: 'envKey',
  name: 'parrot Bot'
})

bot.on("message", msg => {
    switch (msg.type) {
    case "message":
      if (msg.channel[0] === "f" && msg.bot_id === 'parrot) {
        getRandomJoke(postMessage, msg.user)
      }

      
      break
    }
  })


  const postMessage = (message, user) => {
    bot.postMessage(user, message, { as_user: true })
  }

  const getRandomJoke = (callback, user) => {
    return request("https://icanhazdadjoke.com/slack", (error, response) => {
      if (error) {
        console.log("Error: ", error)
      } else {
        let jokeJSON = JSON.parse(response.body)
        let joke = jokeJSON.attachments[0].text
        console.log(joke);
        return callback(joke, user)
      }
    })
  }
  
