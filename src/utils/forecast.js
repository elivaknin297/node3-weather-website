const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/360c05bf9534dfc0178d69dcba54891e/' + latitude + ',' + longitude + '?units=si'

    request({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        }
        else {
            const currently = body.currently
            const temperature = currently.temperature
            const precipProbability = currently.precipProbability
            callback(undefined, body.daily.data[0].summary +  ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain. Today\'s highest temperature is ' + body.daily.data[0].temperatureHigh + ' and the lowest tempetarure is ' + body.daily.data[0].temperatureLow + '.')
        }
    })
}

module.exports = forecast