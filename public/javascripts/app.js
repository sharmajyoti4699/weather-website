console.log(' client side java script code')

const weatherform=document.querySelector('form')
const searchinput=document.querySelector('input')
const msgone=document.querySelector('#msg-1')
const msgtwo=document.querySelector('#msg-2')

weatherform.addEventListener('submit',(event)=>{
   event.preventDefault()
   const location=searchinput.value
   msgone.textContent='Loading data..'
   msgtwo.textContent=''
fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           console.log(data.error)
            msgone.textContent=data.error
        }
        else{
       msgone.textContent=data.location
       msgtwo.textContent=data.forecast
    }
    })
})

})