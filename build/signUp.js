require('./main.js');

submit_signup = document.getElementById('signup')
console.log("YAPO CTM")
email = document.getElementById('exampleInputEmail1')
password = document.getElementById('exampleInputPassword1')
submit_signup.addEventListener('click', check_signup(email, password))
console.log("YAPO CTM")