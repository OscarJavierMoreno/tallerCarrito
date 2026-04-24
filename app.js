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

//Captando el boton de finalizar compra
const completePurchase = document.getElementById("completePurchase");


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
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));

    const li = createElement("li", "add__container");
    li.dataset.price = numericPrice; //Guardando el precio real

    const item = createElement("div", "add__item");

    const img = createElement("div", "add__img");
    const iconBox = createElement("div", "add__icon", icon);

    const info = createElement("div", "add__info");

    const titleP = createElement("p", "add__title", title);
    const priceP = createElement("p", "add__price", price);

    const quantities = createElement("div", "add__quantities");

    const btnMinus = createElement("button", "add__button", "-");
    btnMinus.disabled = true; //El booton inicia deshabilitado

    const counter = createElement("p", "add__counter", "1");

    const btnPlus = createElement("button", "add__button", "+");

    const btnDelete = createElement("button", "add__button-delete");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can");

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
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    //1. Buscar si el producto ya existe en el carrito
    const existingItem = [...listAddProducts.children].find((li) =>
    {
        return li.querySelector(".add__title").textContent === title;
    });

    //2. SI EXISTE → aumentar cantidad
    if (existingItem)
    {
        const counterElement = existingItem.querySelector(".add__counter");
        const btnMinus = existingItem.querySelectorAll(".add__button")[0];

        let quantity = parseInt(counterElement.textContent);

        quantity++;
        counterElement.textContent = quantity;

        //Activando el botón "-"
        btnMinus.disabled = false;

        amountPrices += price;

        updateUI();

        return; //Saliendo para NO crear duplicado
    }

    //3. SI NO EXISTE → crear nuevo item
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

    const price = parseFloat(li.dataset.price);

    //Obteniendo la cantidad real
    const quantity = parseInt(li.querySelector(".add__counter").textContent);

    //Eliminando del DOM
    li.remove();

    //Restando correctamente
    amountProducts -= quantity;
    amountPrices -= price * quantity;

    updateUI();
}

function updateUI()
{
    cartCounter.textContent = amountProducts;
    cartCounterNavBar.textContent = amountProducts;

    totalCounter.textContent = amountPrices.toLocaleString("es-CO",
    {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

//====== FUNCIONAMIENTO CANTIDADES ======
function handleQuantity(e)
{
    const button = e.target;
    const li = button.closest(".add__container");

    const counterElement = li.querySelector(".add__counter");
    const btnMinus = li.querySelectorAll(".add__button")[0];
    const btnPlus = li.querySelectorAll(".add__button")[1];

    let quantity = parseInt(counterElement.textContent);

    const price = parseFloat(li.dataset.price);

    //BOTÓN incrementl
    if (button.textContent === "+")
    {
        quantity++;
        amountPrices += price;
    }

    //BOTÓN decremento
    if (button.textContent === "-")
    {
        if (quantity > 1)
        {
            quantity--;
            amountPrices -= price;
        }
    }

    //Actualizando cantidad visual
    counterElement.textContent = quantity;

    //CONTROL DEL BOTÓN "-"
    if (quantity <= 1)
    {
        btnMinus.disabled = true;
    }
    else
    {
        btnMinus.disabled = false;
    }

    updateUI();
}

listAddProducts.addEventListener("click", (e) =>
{
    if (e.target.closest(".add__button-delete"))
    {
        deleteProduct(e);
    }

    if (e.target.classList.contains("add__button"))
    {
        handleQuantity(e);
    }
});


//====== FUNCIONAMIENTO BOTON FINALIZAR COMPRA ======
function handleCompletePurchase()
{
    //Validación: carrito vacío
    if (amountProducts === 0)
    {
        alert("Tu carrito está vacío 🛒");
        return;
    }

    //Preguntando si se desea finalizar la compra
    const confirmPurchase = confirm("¿Deseas finalizar la compra?");

    if (!confirmPurchase) return;

    alert("✅ Compra finalizada con éxito");

    //Limpiando el carrito
    listAddProducts.innerHTML = "";

    //Reseteaando variables
    amountProducts = 0;
    amountPrices = 0;

    //Actualizando la UI
    updateUI();
}

//Evento dell boton
completePurchase.addEventListener("click", handleCompletePurchase);
