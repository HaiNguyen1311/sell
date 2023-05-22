let listUserApi = 'http://localhost:3001/listUser/' 
let TrangHome = './Home/home.html'
let listUser = [
    {
        "id": 1,
        "username": "admin",
        "password": "admin"
    },
    {
        "id": 2,
        "username": "Admin",
        "password": "admin"
    }
] 
console.log(listUser)

function getCourses(data) {
    fetch(listUserApi)
        .then(response => response.json())
        .then(data => {      
            listUser = data;
        })
}
getCourses()

let islogin = !!localStorage.getItem("token")

function checkLogin() {
    if(islogin) {
        window.location.href = TrangHome;
    }
}

function login(data) {
    const Check = listUser.find(user => user.username  === data.username && user.password === data.password);
    if (Check) {
        localStorage.setItem("token", username)
        islogin = true
        checkLogin()
    } else {
        alert('Sai tài khoản hoặc mật khẩu')
    }
}
Validator({
    form: '#form-1',
    formGroupSelector: '.form-group', 
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#username', 'Hãy nhập username'),
        Validator.isRequired('#password', 'Hãy nhập password'),
    ],
    onSubmit: function(data) {
        console.log(data)
        login(data)
    }
});