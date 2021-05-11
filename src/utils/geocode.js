const request = require ('request')
//GeoTagging Function
  const GeoCode= (address, callback)=>
  {

     const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJjaGllc2R1YmV5IiwiYSI6ImNrbzhvM3JxMzEwejUyb3BkM2lhNW10Z3EifQ.nNjdhAYUu4uOzWlTJZB0FQ'
    

    //We can use Property Shorthand below as 
    //Here "url" property takes value from "url" variable
    request({url, json:true},(err,{body})=>
    {
    //Instead of setting a variable for res.body , we can Destructure the "res" object as above
     // const response=res.body;

      if(err) 
      {
        //Calling callback() to give access to error object instead of just logging
        callback(error,undefined)
        //console.log(err);
      }
      
      else if(body.message || body.features.length===0)
      {
          //Calling callback() to give access error
          callback('Input Error',undefined)
          //console.log("Input Error")
      }

        else
        {
          callback(undefined,{
            lat:body.features[0].center[1],
            long:body.features[0].center[0],
            loc:body.features[0].place_name

          })
          // console.log(` Location ${response.query} has Longitude = ${response.features[0].center[0]} and Latitude =  ${response.features[0].center[1]}`)
        }
      
    })
  }

  module.exports =GeoCode


  //GeoTagging API

      // const url_geo= "https://api.mapbox.com/geocoding/v5/mapbox.places/Mihijam.json?access_token=pk.eyJ1IjoiYXJjaGllc2R1YmV5IiwiYSI6ImNrbzhvM3JxMzEwejUyb3BkM2lhNW10Z3EifQ.nNjdhAYUu4uOzWlTJZB0FQ"
    
  