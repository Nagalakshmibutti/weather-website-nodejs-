const request = require("request");




forecast = (long,lati, callback) =>{
    //const url = 'http://api.weatherstack.com/current?access_key=0c91a33f9fe0a9ad3a07e3562488e41d&query=37.8267,-122.4233&units=f';
    const url = 'http://api.weatherstack.com/current?access_key=0c91a33f9fe0a9ad3a07e3562488e41d&query='+long+','+lati+'&units=f';
    //console.log(url);
    // request({url:url, json:true}, (error,response)=>{ modified version below
    request({url, json:true}, (error,{body}) =>{
            if(error){
                callback("please chech your internet connection ..once", undefined);
           // }else if(response.body.error){ Modified code is below using de-structuring  
            }else if(body.error){
                callback("Recheck the your URL", undefined);
            }else{
                callback(  undefined, 
                  body.current.weather_descriptions[0]+ ". Temparature is "+ body.current.temperature + " degrees out. It fels like "+ body.current.feelslike + " degrees out ");
            }
    });
}



module.exports = forecast;