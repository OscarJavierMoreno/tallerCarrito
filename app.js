//====== CAPTANDO ELEMENTOS ======

//Botones "Agregar al carrito"
const buttonsAddCart = document.querySelectorAll(".product__button");

//Contenedor del carrito
const listAddProducts = document.getElementById("listAddProducts");


//====== HELPERS ======
function createElement(tag, className, text)
{
    const el = document.createElement(tag);
    el.classList.add(className);

    if (text)
    {
        el.textContent = text;
    }

    return el;
}


//====== CREAR ITEM DEL CARRITO ======
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


    // Armar estructura
    btnDelete.appendChild(trashIcon);

    quantities.append(btnMinus, counter, btnPlus);
    info.append(titleP, priceP, quantities);
    img.append(iconBox);
    item.append(img, info);
    li.append(item, btnDelete);

    return li;
}


//====== FUNCION PRINCIPAL ======
function addCartButtonWorks(e)
{
    const card = e.target.closest(".product__card");

    const icon = card.querySelector(".product__product").textContent;
    const title = card.querySelector(".product__info-title").textContent;
    const price = card.querySelector(".product__price").textContent;

    const cartItem = createCartItem(icon, title, price);

    listAddProducts.appendChild(cartItem);
}


//====== EVENTOS ======
buttonsAddCart.forEach((button) =>
{
    button.addEventListener("click", addCartButtonWorks);
});