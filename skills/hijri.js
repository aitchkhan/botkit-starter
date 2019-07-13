var request = require('request');

module.exports = function (controller) {

    controller.hears(['date in (.*)', '(.*) date', 'date in (.*)?'], 'message_received', function (bot, message) {
        var hijri = message.match[1].replace('?', '');
        request('http://api.aladhan.com/v1/gToH?date=' + hijri + '', function (err, response, body) {

            console.log('error: ', err); // Handle the error if one occurred
            console.log('statusCode: ', response && response.statusCode); // Check 200 or such
            console.log('Body: ', body);
            if (response.statusCode == '200') {
                var obj = JSON.parse(body);
                console.log(obj.data.hijri);
                console.log('Response: ', response.hijri);
                bot.reply(message, 'Date in ' + hijri + ' AD ' + obj.data.hijri.date + ' AH');
            } else {
                bot.reply(message, 'Sorry, this is not a correct date format.');
            }


        });
    })

};
