var request = require('request');

module.exports = function (controller) {

    controller.hears(['weather in (.*)', '(.*) weather', 'weather in (.*)?'], 'message_received', function (bot, message) {
        var city = message.match[1].replace('?', '');
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a3437cbf36daa3974433fda05d12cc21&units=metric', function (err, response, body) {

            console.log('error: ', err); // Handle the error if one occurred
            console.log('statusCode: ', response && response.statusCode); // Check 200 or such
            console.log('Body: ', body);
            if (response.statusCode == '200') {
                var obj = JSON.parse(body);
                console.log(obj.weather[0].main);
                console.log('Response: ', response.weather);
                bot.reply(message, 'Weather in ' + city + ' city is ' + obj.weather[0].main + '.');
            } else {
                bot.reply(message, 'Sorry, i can\'t find the weather in your City.');
            }


        });
    });

    controller.hears(['temperature in (.*)', '(.*) temperature', 'temp in (.*)', 'weather in (.*)?'], 'message_received', function (bot, message) {
        var city = message.match[1].replace('?', '');
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a3437cbf36daa3974433fda05d12cc21&units=metric', function (err, response, body) {
            if (response.statusCode == '200') {
                console.log('error: ', err); // Handle the error if one occurred
                console.log('statusCode: ', response && response.statusCode);
                console.log('Body: ', body);// Check 200 or such
                var obj = JSON.parse(body);
                console.log(obj.main.temp);
                bot.reply(message, 'The temperature in ' + city + ' city is ' + obj.main.temp + ' °C.');
            } else {
                bot.reply(message, 'Sorry, i can\'t find the temperature in your City.');
            }
        });
    });

    controller.hears(['humidity in (.*)', '(.*) humidity', 'humid in (.*)'], 'message_received', function (bot, message) {
        var city = message.match[1].replace('?', '');
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a3437cbf36daa3974433fda05d12cc21&units=metric', function (err, response, body) {
            if (response.statusCode == '200') {
                console.log('error: ', err); // Handle the error if one occurred
                console.log('statusCode: ', response && response.statusCode);
                console.log('Body: ', body);// Check 200 or such
                var obj = JSON.parse(body);
                console.log(obj.main.humidity);
                bot.reply(message, 'The humidity in ' + city + ' city is ' + obj.main.humidity + '%');
            } else {
                bot.reply(message, 'Sorry, i can\'t find the humidity in your City.');
            }
        });
    });

    controller.hears(['sunrise in (.*)', '(.*) sunrise', 'sunrise in (.*)'], 'message_received', function (bot, message) {
        var city = message.match[1].replace('?', '');
        request('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=a3437cbf36daa3974433fda05d12cc21&units=metric', function (err, response, body) {
            if (response.statusCode == '200') {
                console.log('error: ', err); // Handle the error if one occurred
                console.log('statusCode: ', response && response.statusCode);
                console.log('Body: ', body);// Check 200 or such
                var obj = JSON.parse(body);
                console.log(obj.main.sunrise);
                var utcSeconds = obj.sys.sunrise;
                var d = new Date(0);
                d.setUTCSeconds(utcSeconds);
                console.log('Sunrise datetime: ', d);
                bot.reply(message, 'The sunrise in ' + city + ' city is ' + d + "");
            } else {
                bot.reply(message, 'Sorry, i can\'t find the sunrise in your City.');
            }
        });
    });}
