const request = require('request')
const forcast = (latitude,longitude,location,callback)=>{


const url = 'https://api.darksky.net/forecast/6b914c45837496e66e4ad941ee5f97ba/' + latitude +',' + longitude + '?units=us&limit=1'

request({url, json : true}, (error,{body})=>{
   if(error){
      callback('connect to net',undefined)
   }
   else if(body.error){
      callback('enter correctly',undefined)
   }
   else{
      callback(undefined,'In '+ location + ' currently daily temperature is ' +body.daily.data[0].temperatureHigh+' and Currently rain chance is ' +body.currently.precipProbability)
   }
})
}

module.exports = {
   forcast : forcast
}