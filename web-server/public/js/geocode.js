const request = require('request')
// const url = 'https://api.darksky.net/forecast/6b914c45837496e66e4ad941ee5f97ba/37.8267,-122.4233?units=us&lan=es'

// request({url : url, json : true}, (error,response)=>{
//    console.log(toString(response.body.daily.data[0].temperatureHigh +response.body.currently.precipProbability))
// })


// const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiaGFyc2gtOTA5MCIsImEiOiJjazVneHNkcXEwYnNoM2ttaW1meTFhdDN0In0.pTvbf6BkYp--jSt9qnYqyA&limit=2'
// request({url : geoURL,json:true},(error,response)=>{
//     if(error){
//         console.log('unable to connect')
//     }
//     else if(response.body.error){
//         console.log('unable to find location')
//     }
//     else{
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(latitude +' , '+longitude)
    
// }})


const geocode = (address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiaGFyc2gtOTA5MCIsImEiOiJjazVneHNkcXEwYnNoM2ttaW1meTFhdDN0In0.pTvbf6BkYp--jSt9qnYqyA&limit=2'

    request({url,json:true},(error,{body})=>{

    
        if(error){
            callback('unable to connect',undefined)
        }
        else if(body.features.length == 0)
        {
            callback('unable to find location',undefined)
        }
        else{
            
            callback(undefined,{
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location :body.features[0].place_name,
                console.log('location')
            })
        }
    })

}


module.exports = {
    geocode : geocode
}