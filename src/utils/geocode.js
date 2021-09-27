const request = require("request");

const geocode =(cityName, callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(cityName) +'.json?access_token=pk.eyJ1IjoibmVoYWlyaW4iLCJhIjoiY2t0czNibjE2MWM3dzJvbXBocmF4ZGl4ciJ9.9QSEPW5vJFqLUmX0SICGeQ&limit=1';
   //console.log(url)
   // request({url:url, json:true}, (error,response)=>{ modified version below
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("please chech your internet connection ..once", undefined);
        //}else if(response.body.features.length === 0){ modified version below
        }else if(body.features.length === 0){
            callback("Recheck the your URL",undefined);
        }
        else{
            callback(undefined,{
                //latitude : response.body.features[0].center[0], modified version below
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
}


module.exports = geocode;