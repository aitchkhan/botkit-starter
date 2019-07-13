module.exports = function(controller) {

    // My custom skill module!
    // controller is a Botkit application instance
    // I can add handlers and specify middlewares here!

    // respond to the `hello` event, fired when a web chat begins with a new user
    controller.on('hello', function(bot, message) {

        bot.reply(message,'Welcome to ESKADENIA Chat bot');

    });

    // listen for the word "help"
    controller.hears('help',  'message_received', function(bot, message) {

        bot.reply(message,'Need help? I am here!');

    });

    // add a middleware to log messages sent to the console
    controller.middleware.send.use(function(bot, message, next) {
        console.log('Sending: ', message);
        next();
    });

}