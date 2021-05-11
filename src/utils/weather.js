const request = require ("request")

//Weather Stack API
  // const url_weather = "http://api.weatherstack.com/current?access_key=833803f834be52ee6e2c9754829fb6cd&query=Mihijam"

  // Weather Stack function
  const Forecast =(long,lat,callback)=>
  {
    const url= `http://api.weatherstack.com/current?access_key=833803f834be52ee6e2c9754829fb6cd&query=${lat},${long}`;

    //Property Shorthand below for "url"
    //Object Destructuring used for res.body
    request({url, json:true },(err,{body})=>
    {
      if(err)
      {
        callback(err)
        //console.log(err)
      } 
      else
      {
        //const data=JSON.parse(res.body) parsing to json is not required if json is set to true in options

        //const response=res.body not required coz Destructured above

        if(body.error) 
        {
          callback(body.error.info)
          //console.log(response.error.info)
        }
        else
        {
          callback(undefined,body)
          //console.log(`For ${response.location.name} the temperature is ${response.current.temperature} and weather is ${response.current.weather_descriptions[0]}`)
        }
      }
        
      });
  }

  module.exports = Forecast
  