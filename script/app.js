let products = [
    {
        id: 1,
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 2,
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 3,
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 4,
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    {
        id: 5,
        name: 'Proweb burger',
        price: 44000,
        img: 'https://avatars.mds.yandex.net/i?id=892754ab1bf6a1d338d92fb8b638e87c92eb088d-5234843-images-thumbs&n=13',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
]

const   wrapperList = document.querySelector('.wrapper__list')
  

function outBurgers () {
    products.forEach((item, i) => {
        let { id, name, price, img } = item
        wrapperList.innerHTML += `<div class="wrapper__list-card" id="${id}">
            <p class="wrapper__list-count"></p>
            <img class="wrapper__list-image" src="${img}" alt="">
            <h3 class="wrapper__list-title">${name}</h3>
            <div class="wrapper__list-sub">
                <p class="wrapper__list-text">${price} сум</p>
                <button class="wrapper__list-btn"><img src="images/sell-icon.svg" alt=""></button>
            </div>
        </div>`
    }) 
}
outBurgers()

let   burgerBtns   = document.querySelectorAll('.wrapper__list-btn'),
        cartBtn     = document.querySelector('.wrapper__navbar-btn'),
        cartClose   = document.querySelector('.wrapper__navbar-close'),
        basket      = document.querySelector('.wrapper__navbar-basket'),
        cartAmount  = document.querySelector('.warapper__navbar-count'),
        cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice'),
        cartBasket    = document.querySelector('.wrapper__navbar-checklist'),
        korzina = []

cartBtn.addEventListener('click', () => basket.classList.add('active'))
cartClose.addEventListener('click', () => basket.classList.remove('active'))

burgerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        addAmount(btn)
    })
})

function addAmount(btn) {
    // closest() - метод который подключается к указаному родителю
    // getAttribute() - метод который получение значение указаного атрибута
    let id = btn.closest('.wrapper__list-card').getAttribute('id')
    let currentBurger = products.find((item) => item.id == id)
    currentBurger.amount++
    addToCart(currentBurger)
}


function addToCart(currentBurger) {
    if(currentBurger.amount > 0) {
        if(!korzina.includes(currentBurger)) {
            korzina.push(currentBurger)
        }
    }
    outAmountAndPrice()
}

function outAmountAndPrice () {
    
    cartTotalPrice.innerHTML = getPrice()
    let totalAmount = getAmount()
    if(totalAmount > 0) {
        cartAmount.classList.add('active')
        cartAmount.innerHTML = totalAmount
    }else {
        cartAmount.classList.remove('active')
        cartAmount.innerHTML = ''
    }
    
    outFromKorzina()
}


function getAmount() {
    let sum = 0
    products.forEach((item) => {
        sum += item.amount
    })
    return sum 
}

function getPrice() {
    let sum = 0
    products.forEach((item) => {
        sum += item.totalSum
    })
    
    return sum +  'сумм'
}

function outFromKorzina() {
    cartBasket.innerHTML = ''
    korzina.forEach((burger) => {
        cartBasket.innerHTML += createBurger(burger)
    })
}


function createBurger(burger) {
    return `
        <div class="navbar__item">
            <div class="navbar__item-left">
                <img src="${burger.img}" alt="">
                <div class="navbar__item-left-info">
                    <p class="navbar__item-left-name">${burger.name}</p>
                    <p class="navbar__item-left-price">${burger.price} сум</p>
                </div>
            </div>
            <div class="navbar__item-right">
                <button data-symbol="-" class="navbar__item-btn">-</button>
                <output class="navbar__item-count">${burger.amount}</output>
                <button data-symbol="+" class="navbar__item-btn">+</button>
            </div>
        </div> 
    `
}



window.addEventListener('click', (event) => {
    if(event.target.classList.contains('navbar__item-btn')) {
        let btn = event.target
        let burgerName = btn.closest('.navbar__item').querySelector('.navbar__item-left-name').innerHTML
        let burger = products.find((item) => item.name == burgerName)
        let dataValue = btn.getAttribute('data-symbol')
        if(dataValue == '+') {
            burger.amount++
        }else if(dataValue == '-') {
            burger.amount--
        }
        korzina = korzina.filter((burger) => burger.amount > 0)
        outFromKorzina()
        outAmountAndPrice()
    }
})


const titleElement = document.querySelector('.title');
let counter = 0;
let fontSize = 20; 

function count() {
    if (counter < 100) { 
        titleElement.textContent = counter;
        counter++;
        setTimeout(count, 20);
    } else {
        titleElement.textContent = counter; 
        increaseSize();
    }
}

function increaseSize() {
    if (fontSize < 70) { 
        fontSize += 2; 
        titleElement.style.fontSize = fontSize + 'px';
        setTimeout(increaseSize, 20); 
    } else {
        titleElement.textContent = counter + ' lvl';
    }
}

window.onload = function() {
    count();
};