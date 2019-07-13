const twilioVerification = require('../components/twilio-verify');

module.exports = function(controller) {

    // My custom skill module!
    // controller is a Botkit application instance
    // I can add handlers and specify middlewares here!

    // respond to the `hello` event, fired when a web chat begins with a new user
    controller.hears('got a phone',  'message_received', function(bot, message) {

        bot.reply(message,'Tell me your phone number');

    });

    controller.on('message_received', async function(bot, message) {
        const response = await twilioVerification(message.text);
        console.log(response)
        bot.reply(message, response);

    })

    // add a middleware to log messages sent to the console
    // controller.middleware.send.use(function(bot, message, next) {
    //     console.log('Sending: ', message);
    //     next();
    // });

}
