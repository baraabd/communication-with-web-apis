const request = require('request')

const forecast = (latitude, longitude, callback) => {
    //http://api.weatherstack.com/current?access_key=e1acc672f48faa04f0ab6fd194c7e625&query=37.8267,-122.4233";
    const url = 'http://api.weatherstack.com/current?access_key=e1acc672f48faa04f0ab6fd194c7e625&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
              weather_descriptions:
                body.current.weather_descriptions[0] +
                " It is currently " +
                body.current.temperature +
                " ℃. There is a " +
                body.current.precip +
                "% chance of rain.",
              weather_icons: body.current.weather_icons[0],
              city: body.request.query
            });
          }
    })
}

module.exports = forecast