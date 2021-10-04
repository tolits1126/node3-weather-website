const request = require('request')

const geocode = (address, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoidG9saXRzMTEyNiIsImEiOiJja3U2a25lbTA1NjB6MndwaTVjcHF3OXVyIn0.hpGF9Xon25_auk7VJIlX1Q'

request({url: url, json: true}, (error,response) => {
    if(error){
        callback('Unable to connect to geo services. Please check your internet connection')
    } else if (response.body.features.length === 0){
        callback('Unable to find location')

    } else {
        callback(undefined, {
            latitude: response.body.features[0].center[0],
            longtitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        
        })

    }
    
  })


}



module.exports = geocode