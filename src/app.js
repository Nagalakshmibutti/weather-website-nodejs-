const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require("./utils/forecast")


const app = express();

//console.log(path.join(__dirname, '../public'))



const Path_of_public_dir_and_html_files = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname ,'../template/views');
const partialsPath = path.join(__dirname , '../template/partials');

app.set('view engine', 'hbs');
app.set('views' , viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(Path_of_public_dir_and_html_files));

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather',
        name : "Naglakshmibutti"
    });
})



app.get('/about', (req,res)=>{
    res.render('about',{
        title : 'About Page',
        name : 'Nagalakshmibutti'
    });
});


app.get('/help' , (req , res) =>{
    res.render('help', {
        title: "Help",
        msg : " help page",
        name : "nagalakshmibutti"
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'Please provide the serach in a format like this localhost:3000/weather?address=chilakaluripet'
        })
    }

    const city = req.query.address;

    geocode(city, (error,{ latitude, longitude, location}={}) => {
        if(error){
            return res.send (
                {error}
                );
        }
        console.log( 'data' , latitude, longitude,location); 
        forecast(latitude, longitude, (error,forecastdata) =>{
                if(error){
                     return(error)
                }
                    res.send({
                        Data :forecastdata,
                        address : city,
                        location : location
                    });
            console.log("Data", forecastdata);
        });
    });
         
     
     






   
    // res.send({
    //     day : 'searing light',
    //     location : 'chilakaluripet'
    // })
});

//Page not found setup
app.get('*' , (req,res) =>{
  res.render('404error',{
      title: '404',
      erroMesaage : 'Please consider checking the url again',
      name : 'Butti Nagalakshmi'
  })
})

let port = process.env.PORT

if((port == null) || (port =" ")){
    port = 3000
}

app.listen(port,() =>{
    console.log('The server is up at port 3000')
})