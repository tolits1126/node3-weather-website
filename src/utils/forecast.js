const request = require('request')

const forecast = (latitude, longtitude, callback ) => {
    const url ='http://api.weatherstack.com/current?access_key=7adbdb5afc4ecf6982b248c2d837dbb2&query=' + latitude + ',' + longtitude + ''

request({url: url, json: true}, (error, {body}) => {
    if(error){
        callback('Unable to connect to weather services',undefined)
    } else if (body.error) {
        callback('Unable to find location',undefined)
    } else {
        callback (undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% of rain') 
            

            
        }  
   })
}

module.exports = forecast