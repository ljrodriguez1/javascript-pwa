
submit_login = document.getElementById('logIn')
email = document.getElementById('exampleInputEmail')
password = document.getElementById('exampleInputPassword')

submit_login.addEventListener('click', check_login(email, password))
