const Discord = require('discord.js'),
    weather = require('weather-js')
module.exports.run = async (bot, message, args) => {

    const bargs = message.content.split(' ');
    const searchString = bargs.slice(1).join(' ')
    weather.find({ search: searchString, degreeType:'C'}, function (err,result, degreeType) {
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
                                message.channel.send('**Please enter a valid location.**')
                                return;
                        }
        let current = result[0].current;
        let location = result[0].location;
        let fat = current.temperature.replace(/[^0-9]/g, '')
        let f = parseInt(fat * (9 / 5) + 32)
        let ffat = current.feelslike.replace(/[^0-9]/g, '')
        let feels = parseInt(ffat * (9 / 5) + 32)

           message.channel.send({embed:{
               author: {
                   name: message.author.tag,
                   icon_url: message.author.avatarURL
               },
               color: 0xff0000,
               description: `◽**Weather for:** ${current.observationpoint}\n\n◽**Observation time:** ${current.observationtime}\n\n◽**Weather is**: ${current.skytext}\n\n◽**Timezone:** UTC ${location.timezone}\n\n◽**Temperature:** ${current.temperature} **°C** ** / ** ${f} **°F**\n\n◽**Feels Like:** ${current.feelslike} **°C** ** / ** ${feels} **°F**\n\n◽**Wind speed:** ${current.winddisplay}\n\n◽**Humidity:** ${current.humidity}**%**`
           }})

    });
}

module.exports.help = {
    name: "weather",
  }
