var listUser = "http://localhost:3001/listUser"

Validator({
    form: '#form-1',
    formGroupSelector: '.form-group', 
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#username', 'Vui lòng nhập tên đăng kí'),

        Validator.isRequired('#email', 'Vui lòng nhập email'),
        Validator.isEmail('#email'), 

        Validator.minLength('#password', 6), 

        Validator.isRequired('#password_confirmation', 'Vui lòng nhập lại mật khẩu'),
        Validator.isConfirmed('#password_confirmation', function() {
            return document.querySelector('#form-1 #password').value;
        }, 'Mật khẩu nhập lại không chính xác') 
    ],
    onSubmit: function(data) {
        //call API
        console.log(data);
        createUser(data)
    }
});

function createUser(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(listUser)
        .then(function(response) {
            return response.json();
        })
        .then(function(existingUsers) {
            var duplicateUser = existingUsers.find(function(user) {
                return user.username === data.username || user.email === data.email;
            });
            if (duplicateUser) {
                alert('Tên người dùng hoặc email đã tồn tại. Đăng ký không thành công.');
            } else {
                return fetch(listUser, options);
            }
        })  
        .then(function(response) {
            if (response.ok) {
                alert('Đăng ký thành công!');
            }
        })
}

inputPassword.oninput = function() {
    let point = 0
    let value = password.value
    let widthPower = ['1%', '25%', '50%', '75%', '100%']
    let colorPower = ['#d73f40', '#dc6551', '#f2b84f', '#7bde952', '#30cec7']

    if(value.length >= 6) {
        let arrayTest = [
            /[0-9]/,
            /[a-z]/,
            /[A-Z]/,
            /[^0-9a-zA-z]/
        ]
        arrayTest.forEach(item => {
            if(item.test(value)){
                point += 1
            }
        })   
    }
    power.style.width = widthPower[point]
    power.style.backgroundColor = colorPower[point]
}

