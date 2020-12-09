const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhcm1hanlvdGk0Njk5IiwiYSI6ImNraTl4YXQ2cDBqdjEyeXJvbWh3b3dnaWMifQ.5LrdoZIttDLH0cQdWwJADA&limit=1'
 
   
  //shorthand means use only single names when property and value have same name like url in our case.
  //destructuring means provides whole values of objects as variable in indivisual terms like response object in our case.
    //  request({url:url,json:true},(error,response)=>{ below line using destructering and shorthand

    request({url,json:true},(error,{body})=>{
        if(error){
        callback("unable to connect weather service",undefined)
        }
        else if(body.features.length===0)
       { callback("unable to find location!",undefined)}
        else
        {
            callback(undefined,{
            longitude: body.features[0].center[0],
             latitude: body.features[0].center[1],
             location: body.features[0].place_name

            })
        }
    })
}   
module.exports=geocode