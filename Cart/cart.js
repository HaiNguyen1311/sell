let listCart = document.getElementById('listCart')
var giohang = JSON.parse(localStorage.getItem('cartItems'))
var html = giohang.map(gh => {
    return `
    <div class="itemCart">
        <div class="img">
            <img src="${gh.img}">
        </div>
        <div class="content">
            <div class="title">${gh.title}</div>
            <div class="checkOut">
                <div class="price">${gh.price}</div>
                <div class="cal">x</div>
                <div class="quantity">${gh.quantity}</div>
                <div class="cal">=</div>
                <div class="totalItem">0</div>
            </div> 
        </div>
    </div>
    `
})
listCart.innerHTML = html.join('');  

const itemCart = document.querySelectorAll("#listCart .itemCart")
let totalPrice = 0
let totalPriceItem = 0
itemCart.forEach((itemCart) => {
    const valueItem = itemCart.querySelector('.price').innerHTML
    const valueQuantity = itemCart.querySelector('.quantity').innerHTML
    const  totalPriceItem = valueItem * valueQuantity * 1000
    totalPrice += totalPriceItem   
    const valueTotalItem = itemCart.querySelector('.totalItem')
    valueTotalItem.innerHTML = totalPriceItem.toLocaleString()
})
const totalList = document.querySelector(".totalList")
totalList.innerHTML = totalPrice.toLocaleString()
console.log(giohang, totalPrice)


Validator({
    form: '#form-1',
    formGroupSelector: '.form-group', 
    errorSelector: '.form-message',
    rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập họ và tên'),

        Validator.isRequired('input[name="gender"]', 'Vui lòng chọn danh xưng'),

        Validator.isRequired('#province', 'Vui lòng chọn thành phố'),
        Validator.isRequired('#district', 'Vui lòng chọn quận huyện'),
        Validator.isRequired('#wards', 'Vui lòng chọn phường xã'),
        Validator.isRequired('#accommodation', 'Vui lòng nhập địa chỉ'),

        Validator.isEmail('#email'), 

        Validator.isRequired('#phone', 'Vui lòng nhập số điện thoại'),
    
    ],
    onSubmit: function(data) {
        //call API
        console.log(data);
    }
});