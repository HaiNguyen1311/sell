let productApi = 'http://localhost:3000/listProduct/' 
let GioHang = "../Cart/cart.html"
let listProduct = []
getCourses(renderCourses)
function getCourses() {
    fetch(productApi)
        .then(response => response.json())
        .then(data => {      
            listProduct = data;
            productFilter = listProduct;
            renderCourses(productFilter);
        })
}

let List
function renderCourses(productFilter) { 
    const list = document.querySelector('#list');
    const htmls = productFilter.map(course => {
        return `
            <div class="item" data-key=${course.id}>
                <div class="img">
                    <img src="${course.img}">
                </div>
                <div class="content">
                    <div class="title">${course.title}</div>
                    <div class="des">${course.des}</div>
                    <div class="price">${course.price}</div>
                    <button  class="add">Add to cart</button>                           
                </div>         
            </div>
        `
    })
    list.innerHTML = htmls.join('')
    // gán lại List
    List = document.querySelectorAll('#list .item')
    loadItem(List);

    //kết quả sản phẩm lọc được
    count.innerText = productFilter.length

    btnAddEventListeners()
    addCart()
}

// ======================================================== Add ========================================================
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
function btnAddEventListeners() {
    const btnAdd = document.querySelectorAll(".add")
    btnAdd.forEach((button, index) => {
        button.addEventListener("click", (e) => {
            const btnItem = e.target
            const item = btnItem.closest(".item")
            const id = item.getAttribute('data-key')
            const img = item.querySelector('.img img').src
            const title = item.querySelector('.title').innerText
            const price = item.querySelector('.price').innerText
            const quantity = 1 // Default quantity is 1

            if (!cartItems.some(item => item.id === id)) {
                const cartItem = { id, title, img, price, quantity, index }
                cartItems.push(cartItem)
                localStorage.setItem("cartItems", JSON.stringify(cartItems))
                addCart()
            }else {
                const itemCarts = document.querySelectorAll('.listCart .itemCart');
                itemCarts.forEach(itemCart => {
                    if (itemCart.getAttribute('data-key') === id) {
                        itemCart.classList.add('danger');
                    }
                    setTimeout(() => {
                        itemCart.classList.remove('danger');
                    },1000)
                });
            }
        })
    })
}

function addCart() {
    const listCart = document.querySelector('.listCart');
    const giohang = JSON.parse(localStorage.getItem('cartItems')) || [];
    if(giohang) {
        const html = giohang.map(gh => {
            return `
                <div class="itemCart" data-key="${gh.id}">
                    <div class="img"><img src="${gh.img}"></div>
                    <div class="title">${gh.title}</div>
                    <div class="price">${gh.price}</div>
                    <div class="additions">
                        <button onclick="changeQuatity(${gh.id}, ${gh.quantity -1})" class="minus" >-</button>
                        <div class="count">${gh.quantity}</div>
                        <button onclick="changeQuatity(${gh.id}, ${gh.quantity +1})" class="plus" >+</button>
                    </div>           
                    <button onclick="remove(${gh.id})" class="remove"><img src="../img/bin.png"></button>    
                </div>        
            `
        })
        listCart.innerHTML = html.join('');  
    }
    renderTotal();
    handleQuantity()
}

// ======================================================== Remove ========================================================
function remove(key) {
    const listCart = document.querySelectorAll('.listCart .itemCart');
    listCart.forEach(itemCart => {
        if(itemCart.getAttribute('data-key') ===  String(key)) {
            itemCart.remove();
            const index = Array.from(listCart).indexOf(itemCart);
            cartItems.splice(index, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        }
    })
    renderTotal();
    handleQuantity()
}

// ======================================================== btn + - ========================================================
function changeQuatity(key, newQuantity) {
    const foundIndex = cartItems.findIndex(item => item.id ===  String(key));
    if (foundIndex !== -1) {
        cartItems[foundIndex].quantity = newQuantity;
        if (newQuantity === 0) {
            cartItems.splice(foundIndex, 1);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            addCart(); 
        } else {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            addCart(); 
        }
    }
}

// ======================================================== Total ========================================================
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('$', '')); // Chuyển đổi giá tiền sang số
        const quantity = item.quantity;
        total += price * quantity;
    });
    return total;
}

function renderTotal() {
    const totalElement = document.querySelector('.total');
    const total = calculateTotal();
    totalElement.innerText = total.toFixed(3); // Hiển thị tổng giá tiền với 2 chữ số sau dấu phẩy
}




// ======================================================== Chuyển trang ========================================================
const btnCheckout = document.querySelector('.cart .pay');
btnCheckout.addEventListener('click', () => {
    const itemsInCart = document.querySelectorAll('.listCart .itemCart')
    if (itemsInCart.length > 0) {
        window.location.href = GioHang
    }
});

// ======================================================== update số lượng cart ========================================================
function handleQuantity() {
    const quantitySpan = document.querySelector('.quantity');
    quantitySpan.textContent = cartItems.length;
}

// ======================================================== Page ========================================================
let thisPage = 1; // trang hiện tại
let limit = 6; // 1 trang có 6 sản phẩm
function loadItem() {
    let beginGet = limit * (thisPage -1);
    let endGet = limit * thisPage -1;
    List.forEach((item, key)=> {
        if(key >= beginGet && key <= endGet){
            item.style.display = 'block';
        }else {
            item.style.display = 'none';
        }
    })
    listPage();
}

function listPage() {
    // count tổng số trang
    let count = Math.ceil(List.length / limit);
    document.querySelector('.listPage').innerHTML = '';

    if(thisPage != 1) {
        let prev = document.createElement('li');
        let prevIcon = document.createElement('i');
        prevIcon.classList.add('fas', 'fa-chevron-left');
        prev.appendChild(prevIcon);
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.listPage').appendChild(prev);
    }
    for (i=1; i<= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if(i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.listPage').appendChild(newPage);
    }
    if(thisPage != count) {
        let next = document.createElement('li');
        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-chevron-right');
        next.appendChild(icon);
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.listPage').appendChild(next);
    }
}

function changePage(i) {
    thisPage = i;
    loadItem(); 
}

// ======================================================== Đóng mở cart ========================================================
let openShopping = document.querySelector('.shopping')
let closeShopping = document.querySelector('.closeShopping');
let body = document.querySelector('body');
openShopping.addEventListener('click', ()=>{
    if (body.classList.contains('active')) {
        body.classList.remove('active');
    } else {
        body.classList.add('active');
    }
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

// ======================================================== Filter ========================================================
let productFilter = []
let filter = document.querySelector('.filter')
filter.addEventListener('submit',(e) => {
    e.preventDefault()
    let valueFilter = e.target.elements
    productFilter = listProduct.filter(item => {
        //check category
        if(valueFilter.category.value != '' ) {
            if(item.nature.type != valueFilter.category.value) {
                return false
            }
        }
        //check color
        if(valueFilter.color.value != '') {
            if(!item.nature.color.includes(valueFilter.color.value)) {
                return false
            }
        }
        //check name
        if(valueFilter.name.value != '') {
            if(!item.title.includes(valueFilter.name.value)) {
                return false
            }
        }
        //check min price
        if (valueFilter.minPrice.value != '') {   
            if(parseFloat(item.price)* 1000 < parseFloat(valueFilter.minPrice.value)) {
                return false
            }
        }
        //check max price
        if (valueFilter.maxPrice.value != '') {
            if(parseFloat(item.price)* 1000 > parseFloat(valueFilter.maxPrice.value)) {
                return false
            }
        }
        return true
    })
    renderCourses(productFilter)
})


function confirmLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        logout();
    }
  }

function logout() {
    localStorage.removeItem("token");
    window.location.href = '../index.html'
}