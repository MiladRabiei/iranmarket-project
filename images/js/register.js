import { setCookie } from "./login.js"
let $=document
let userNameInput=$.querySelector('.userName')
let lastNameInput=$.querySelector('.lastName')
let emailInput=$.querySelector('.email')
let mobileInput=$.querySelector('.phoneNumber')
let passwordInput=$.querySelector('.password')
let submitBtn=$.querySelector('input[type="submit"]')

let registerClientToDatabase=(isExist)=>{
    let client=null
    if(userNameInput.value.trim()&&lastNameInput.value.trim()&&emailInput.value.trim()&&mobileInput.value.trim()&&passwordInput.value.trim()){
        client={
            name:userNameInput.value,
            lastname:lastNameInput.value,
            email:emailInput.value,
            phoneNumber:mobileInput.value,
            password:passwordInput.value
        }
        if(isExist){
            alert('you have registered before')
        }else{
            fetch('https://api-project-85678-default-rtdb.firebaseio.com/users.json',{
            method:'POST',
            headers:{
                "Content-Type":'aplication/json'
            },
            body:JSON.stringify(client)
        }).then(res=>{
            console.log(res);
            setCookie(client)
            location.href='http://127.0.0.1:5500/iranmarket-project/index.html'
        }).catch(err=>{
            console.log(err);
        })
        
        }
    }
userNameInput.value=''
lastNameInput.value=''
emailInput.value=''
mobileInput.value=''
passwordInput.value=''
}

let getClients=event=>{
    event.preventDefault()
    fetch('https://api-project-85678-default-rtdb.firebaseio.com/users.json')
    .then(res=> res.json())
        .then(data=>{
            let isExist=null
            console.log(data);
            if(data){
                data=Object.entries(data)
                isExist=data.some(item=>{
                    if(item[1].email===emailInput.value || item[1].phoneNumber===mobileInput.value){
                        return true
                    }else{
                        return false
                    }
                })
            }else{
                isExist=null
            }
        registerClientToDatabase(isExist)
    })
}


submitBtn.addEventListener('click',getClients)