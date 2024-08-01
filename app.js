const openCart = document.querySelector('.cart');
const closeCart = document.querySelector('.closeCart');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');
const card = document.querySelector('.card');

openCart.addEventListener('click', () => {
    body.classList.add('active');
});

closeCart.addEventListener('click', () => {
    body.classList.remove('active');
});
body.addEventListener('click', (e) => {
    if (!card.contains(e.target) && !openCart.contains(e.target)) {
        body.classList.remove('active');
    }
});

const products = [
    { id: 1, name: 'แว่นตาโครตคูล', image: '1.JPG', price: 1290 },
    { id: 2, name: 'กางเกงสุดจ๊าบ', image: '2.JPG', price: 1190 },
    { id: 3, name: 'เสื้อฮู้ด รุ่นเหลืองอ๋อย', image: '3.JPG', price: 13990 },
    { id: 4, name: 'กางเกงขาบาน ทะยานต่อไป', image: '4.JPG', price: 1590 },
    { id: 5, name: 'สูทเกือบคูลแต่ก็คูล', image: '5.JPG', price: 6990 },
    { id: 6, name: 'หมวกสไตล์แร็พสตาร์', image: '6.JPG', price: 690 },
];

const listCards = [];
function initApp() {
    products.forEach((value, key) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/products/${value.image}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()} บาท</div>
            <button onclick="addToCart(${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
}
initApp();

function addToCart(key) {
    event.stopPropagation();
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity += 1;
    }
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;

            const newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/products/${value.image}" alt="${value.name}"></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, newQuantity) {
    event.stopPropagation();
    if (newQuantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = newQuantity;
    }
    reloadCard();
}
