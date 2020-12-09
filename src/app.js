const path=require('path')
const request=require('request')
const express=require('express')
const hbs=require('hbs')
const app=express()
const forecast=require('./utils/forecasts.js')
const geocode = require('./utils/geocodes.js')
//define path for express config
const publicpathdir=path.join(__dirname,('../public'))
const viewpath=path.join(__dirname,('../templates/views'))

const partialPath=path.join(__dirname,('../templates/partials'))
hbs.registerPartials(partialPath)
//setup handlerbars engine and views location
app.set('view engin','hbs')
app.set('views',viewpath)

//setup static directory to serve
app.use(express.static(publicpathdir))

app.get('',(req,res)=>{
    //res.send("home page")
      res.render('index.hbs',{
          title:'Weather',
          name:'Jyoti Sharma'
      })
      
})
app.get('/about',(req,res)=>{
    //res.send("about")
    res.render('about.hbs',{
        title:'About Me',
        name:'Jyoti Sharma'
    })
})
app.get('/help',(req,res)=>{
    //res.send('Help')
    res.render('help.hbs',{
        title:'Help',
        helptext:'information about help!',
        name:'Jyoti Sharma'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide address'
        })
    }

    //{latitude,longitude,location}={}:- it set default value to destructering object if address
    // is doesnot exist like user pass any special character in address field.
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
             res.send({
                 forecast:forecastdata,
                 location,
                 address:req.query.address
             })
        })
    })

})
app.get('/help/*',(req,res)=>{
    //res.send('Help')
    res.render('404.hbs',{
        title:'404',
        name:'Jyoti Sharma',
        errorMsg:'help articles are not found!'
        
    })
})

app.get('*',(req,res)=>{
    //res.send('Help')
    res.render('404.hbs',{
        title:'404',
        name:'Jyoti Sharma',
        errorMsg:'Page not found!'
    })
})
app.listen(3000,()=>{
    console.log("server start")
})