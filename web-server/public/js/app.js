console.log('this is client side server')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg1')
const messageTwo = document.querySelector('#msg2')




weatherForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        messageTwo.textContent = 'loading....'
        messageOne.textContent = ''
const location = search.value
console.log(location)

fetch('/weather?location='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent =data.location
            messageTwo.textContent = data.error
        }
        else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forcast
        }
    })
})})
