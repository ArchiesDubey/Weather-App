// console.log("Client side app.js")

const weatherForm = document.querySelector('form');
const submit=document.querySelector('input');
const msgOne =document.querySelector('#msg-1');
const msgTwo =document.querySelector('#msg-2');
const msgThree =document.querySelector('#msg-3');


weatherForm.addEventListener('submit',(event)=>{
  event.preventDefault();
   //Prevents the default behaviour of refreshing the whole page.

  //The below can be declared only after "submit" is done
  const location = submit.value;
  msgOne.textContent="Searching...";
  msgTwo.textContent="";
  msgThree.textContent="";

//fetch() to call the weather api endpoint
  //Deployment change 3 `http://localhost:4000 ie the domain name is removed
  fetch(`/api/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
    if(data.error) 
    {
      msgOne.textContent=data.error;
      }
    else
    {
      msgOne.textContent=data.address
      msgTwo.textContent ="Temperature is "+data.temperature +"C";
      msgThree.textContent=data.weather;
    }
    })
  })
 
})