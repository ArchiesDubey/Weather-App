const path = require('path')
const express = require('express')
const hbs = require ('hbs') // for using Partials
const GeoCode = require ('./utils/geocode.js')
const Forecast = require('./utils/weather.js')


//Below declaration not required in local just in REPL .
//All other options would work too and recommended
const _dirname=process.cwd()//path.resolve()//process.env.PWD// //
  // console.log(_dirname);
  // console.log(path.join(_dirname,'../public'))
const app = express()

//Deployment change 1 - Port setup
  const port= process.env.PORT || 3000


//Define paths for Express config
  //Serving up the entire Public Directory using Express middleware
  //The entire Directory is served
    const pathPublic=path.join(_dirname,'/public')

    const viewPath=path.join(_dirname,'/template/views')
        //console.log(viewPath)

    const partialsPath=path.join(_dirname,'/template/partials')

//Handlebar setting
  //Template Engine setup for express using HBS
    app.set('view engine','hbs')

  //Setting of custom path to template folder
    app.set('views',viewPath)
  //Setting path for Partials
    hbs.registerPartials(partialsPath)




//Serving static items
 app.use(express.static(pathPublic))



//Routing
  //To make the app.js know that we are sending an HBS instead of static string we use "res.render" instead of "res.send"
  //"res.render" allows to render views

     app.get('',(req,res)=>{
        res.render('index',{
          title: "Weather App",
          name: "Archies Dubey"
        }) //index = file name in "views"
      })
      //the 2nd argument is an object with all the dynamic values we want to render

    app.get('/about',(req,res)=>{
      res.render('about',{
        title:"About Me",
        name:"Archies Dubey"
      })
    })

    app.get('/help',(req,res)=>{
      res.render('help',{
        message:"You shall be rescued",
        title:"Help Page",
        name:"Archies Dubey"
      })
    })

//Setting route
      // app.get('',(req,res)=>{
      //   res.send("Archies over here")
      // })

      // app.get('/help',(req,res)=>{
      //   res.send("Helping helping 1 2 3")
      // })

      // app.get('/about',(req,res)=>{
      //   res.send("<h1>Read here about us</h1>")
      // })

//Serving up JSON with Query string enabled
app.get("/api/weather",(req,res)=>{
  
  if(!req.query.address)
  { 
    return res.send({error:"Provide Location"})
  } 
    //returning to avoid resending response by the below res.send

        // res.send({
        //   address:req.query.address,
        //   weather:"cloudy",

        // })
  
  GeoCode(req.query.address,(error,{lat,long,loc}={})=>
  {
    if(error) return res.send({error})
    else
    {
        //Commenting coz not required
          // console.log(` Location ${data.query} has Longitude = ${data.features[0].center[0]} and Latitude =  ${data.features[0].center[1]}`)

      //Callback call to Forecast()
      Forecast(long,lat,(error,ForCastdata)=>
      {
        if(error) return res.send({error})
        else
        {
          res.send({
            address:loc,
            temperature:ForCastdata.current.temperature,
            weather:ForCastdata.current.weather_descriptions[0]
          })
        }
      })
    }
  })
})

//Custom 404Page
    app.get('/help/*',(req,res)=>{
    res.render('Page404',{
      name:"Archies Dubey",
      title:"Error 404",
      message:"Help Page Not Found"
    })
  })

//Setting up 404 error using "*" wildcard character therefor it must come LAST in routes
  app.get('*',(req,res)=>{
    res.render('Page404',{
      name:"Archies Dubey",
      title:"Error 404",
      message:"Page Not Found"
    })
  })



//Starting server
app.listen(port,()=>console.log("Server started at "+port))