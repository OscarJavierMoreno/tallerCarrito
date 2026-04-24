//====== CAPTANDO ELEMENTOS ======

//Botones "Agregar al carrito"
const buttonsAddCart = document.querySelectorAll(".product__button");

//Contenedor del carrito
const listAddProducts = document.getElementById("listAddProducts");

//Captando el contador del carrito
const cartCounter = document.getElementById("cartCounter");

//Captando el contador del carrito del nav bar
const cartCounterNavBar = document.getElementById("cartCounterNavBar");

//Captando el contador del carrito
const totalCounter = document.getElementById("totalCounter");


//====== VARIABLES ======
let amountProducts = 0;
let amountPrices = 0;


//====== CREANDO ELEMENTO DINAMICO ======
function createElement(tag, className, text)
{
    const element = document.createElement(tag);
    element.classList.add(className);

    if (text) element.textContent = text;

    return element;
}

function createCartItem(icon, title, price)
{
    const li = createElement("li", "add__container");

    const item = createElement("div", "add__item");

    const img = createElement("div", "add__img");
    const iconBox = createElement("div", "add__icon", icon);

    const info = createElement("div", "add__info");

    const titleP = createElement("p", "add__title", title);
    const priceP = createElement("p", "add__price", price);

    const quantities = createElement("div", "add__quantities");

    const btnMinus = createElement("button", "add__button", "-");
    const counter = createElement("p", "add__counter", "1");
    const btnPlus = createElement("button", "add__button", "+");

    const btnDelete = createElement("button", "add__button-delete");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");


    //Armando la estructura
    btnDelete.appendChild(trashIcon);

    quantities.append(btnMinus, counter, btnPlus);
    info.append(titleP, priceP, quantities);
    img.append(iconBox);
    item.append(img, info);
    li.append(item, btnDelete);

    return li;
}

function addCartButtonWorks(e)
{
    const card = e.target.closest(".product__card");

    const icon = card.querySelector(".product__product").textContent;
    const title = card.querySelector(".product__info-title").textContent;
    const priceText = card.querySelector(".product__price").textContent;
    const price = parseFloat(priceText.replace("$", ""));

    const cartItem = createCartItem(icon, title, priceText);

    listAddProducts.appendChild(cartItem);

    updateCounters(price);    
}


buttonsAddCart.forEach((button) =>
{
    button.addEventListener("click", addCartButtonWorks);
});


//====== FUNCIONAMIENTO CONTADORES ======
function updateCounters(price)
{
    amountProducts++;
    amountPrices += price;

    cartCounter.textContent = amountProducts;
    cartCounterNavBar.textContent = amountProducts;
    totalCounter.textContent = amountPrices.toLocaleString("es-CO");
}


//====== FUNCIONAMIENTO BOTONES DE ELIMINAR ======
function deleteProduct(e)
{
    const li = e.target.closest(".add__container");

    //Capturando precio del producto
    const priceText = li.querySelector(".add__price").textContent;
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    //Eliminandolo del DOM
    li.remove();

    //Actualizando contadores
    amountProducts--;
    amountPrices -= price;

    cartCounter.textContent = amountProducts;
    cartCounterNavBar.textContent = amountProducts;
    totalCounter.textContent = amountPrices.toLocaleString("es-CO",
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

//====== FUNCIONAMIENTO CANTIDADES ======

listAddProducts.addEventListener("click", (e) =>
{
    if (e.target.closest(".add__button-delete"))
    {
        deleteProduct(e);
    }
});
