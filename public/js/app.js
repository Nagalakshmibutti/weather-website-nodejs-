// console.log("this is client site script");


// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data) =>{
//         console.log(data);
//     });
// });


//#4B3869


const weatherData = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherData.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent = 'loading......'
    messageTwo.textContent = ''
        fetch('/weather?address='+ location).then((response) =>{
            response.json().then((data) =>{
                    if(data.error){
                        //console.log(data.error);
                        messageOne.textContent = data.error
                    }else{
                        //console.log(data.location);
                        messageOne.textContent =  data.location;
                       // console.log(data.address)
                       messageTwo.textContent =  data.Data;

                    }    
            });
        });
});

