const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=b2196bb787c329707e17aca9542e9245&query='+latitude+','+longitude+'&units=f'
  
  //shorthand means use only single names when property and value have same name like url in our case.
  //destructuring means provides whole values of objects as variable in indivisual terms like response object in our case.
    //  request({url:url,json:true},(error,response)=>{ below line using destructering and shorthand
request({url,json:true},(error,{body})=>{
    if(error)
     callback("unable to connect weather service",undefined)
     else if(body.error)
     callback("unable to find location!",undefined)
     else
    callback(undefined,body.current.weather_descriptions[0]+". It is a currently "+body.current.temperature+" degree out. It feels like "+body.current.feelslike+" degree out.")

})

}   
module.exports=forecast