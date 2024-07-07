let $=document
let userInput=$.querySelector('.login_user')
let passInput=$.querySelector('.login_pass')
let loginBtn=$.querySelector('input[type="submit"]')

let getdata=event=>{
    event.preventDefault();
    fetch('https://api-project-85678-default-rtdb.firebaseio.com/users.json')
    .then(res=>res.json())
    .then(data=>{
        let isExist=null
        
        if(data){
            data=Object.entries(data)
            isExist=data.some(item=>{
                if((item[1].phoneNumber===userInput.value.trim()||item[1].email===userInput.value.trim())&&item[1].password===passInput.value.trim()){
                    console.log(typeof(item[1].password));
                    setCookie(item[1])
                    return true
                }else{
                    return false
                }
            })
        }else{
            isExist=null
        }
        Login(isExist)
    })
}
let setCookie=(item)=>{
    let now =new Date()
        now.setTime(now.getTime()+2*24*60*60*1000)
        document.cookie=`userName=${item.name} ${item.lastname};path=/;expires=${now}`
}
let Login=(isExist)=>{
    if(isExist){
        
        location.href='http://127.0.0.1:5500/iranmarket-project/index.html'
    }else{
        alert('your username or password is incorrect')
    }
    userInput.value=''
    passInput.value=''
}
loginBtn.addEventListener('click',getdata)

export {setCookie}