const indicators = document.querySelectorAll(".news__input"),
    customIndicators = document.querySelectorAll(".news__indicator"),
    news = document.querySelectorAll(".news__element"),
    newsLeftArrow = document.getElementById("news__left"),
    newsRightArrow = document.getElementById("news__right"),
    sectionRightArrows = document.querySelectorAll(".section__arrow.right"),
    sectionLeftArrows = document.querySelectorAll(".section__arrow.left"),
    cartCounter = document.getElementsByClassName("cart__counter")[0],
    cartButton = document.getElementById("cart-button"),
    cartClose = document.getElementById("cart-close"),
    cartBody = document.getElementById("cart-body"),
    cartList = document.getElementById("cart-list"),
    cartTotal = document.getElementById("cart-total"),
    advertisementNew = document.getElementById("advertisementNew"),
    advertisementStock = document.getElementById("advertisementStock"),
    advertisementToggle = document.getElementsByName("advertisement"),
    toCartButtons = document.querySelectorAll(".product__to-cart-btn"),
    buttonPlus = document.querySelectorAll(".plus"),
    buttonMinus = document.querySelectorAll(".minus"),
    buttonSupDel = document.querySelectorAll(".supplements__delete-btn"),
    buttonSupAdd = document.querySelectorAll(".supplements__add-btn"),
    saucesSelect = document.querySelectorAll(".supplements__select"),
    supplementsNumber = document.querySelectorAll(".supplements__number");

let cart = [],
    id = 0,
    total = 0,
    sauces = {
        "chinese": {
            name: "Китайский соус",
            price: 140
        },
        "second": {
            name: "Второй соус",
            price: 200
        },
        "another": {
            name: "Другой соус",
            price: 500
        }
    },
    sliders = {
        sets: {
            left: 2400,
            page: 0
        },
        rolls: {
            left: 2400,
            page: 0
        },
        pizza: {
            left: 2400,
            page: 0
        },
        wok: {
            left: 2400,
            page: 0
        },
        advertisementNew: {
            left: 0,
            page: 0
        },
        advertisementStock: {
            left: 0,
            page: 0
        }
    };


function makeChecked(array, numb) {
    array.forEach((input, index) => {
        input.checked = index === numb ? true : false;
    });
}

function findChecked(array) {
    let newsNumber = 0;
    array.forEach((input, index) => {
        if (input.checked === true) {
            newsNumber = index;
        }
    });
    return newsNumber;
}

function showElement(elementsArray, indicatorsArray, numb) {
    elementsArray.forEach((news, index) => {
        news.className = index === numb ? "news__element showed" : "news__element";
    });
    indicatorsArray.forEach((indicator, index) => {
        indicator.className = index === numb ? "news__indicator checked" : "news__indicator";
    });
}

function makeClickable() {
    let delFromCartButtons = document.querySelectorAll(".list__delete-btn");

    delFromCartButtons.forEach(button => {
        button.onclick = event => {
            cart.forEach(elem => {
                if (elem.id == event.target.parentNode.parentNode.id) {
                    total -= elem.price;
                    if (elem.isSupplement) {
                        total -= elem.supplementPrice;
                    }
                    cartTotal.value = total;
                }
            });
            cart = cart.filter(elem => elem.id != event.target.parentNode.parentNode.id);
            cartCounter.value = cart.length;
            createCart();
        };
    });
};

function createCart() {
    cartList.innerHTML = null;

    let emptyCart = document.createElement("p");

    emptyCart.innerHTML = "Корзина пуста";
    emptyCart.className = "cart__empty";


    if (cart.length === 0) {
        cartList.appendChild(emptyCart);
    } else {
        cart.forEach(elem => {
            let productDiv = document.createElement("div");
            productDiv.className = "cart__product";
            productDiv.id = elem.id;
            if (elem.isSupplement) {
                productDiv.innerHTML = `
                    <div class="list__main-product">
                        <button class="list__delete-btn"></button>
                        <p class="list__element_name">${elem.name}</p>
                        <p class="list__element">${elem.number}</p>
                        <p class="list__element">${elem.price}</p>
                    </div>
                    <div class="list__addition-product">
                        <p class="list__element_name">${elem.supplementName}</p>
                        <p class="list__element">${elem.supplementNumber}</p>
                        <p class="list__element">${elem.supplementPrice}</p>
                    </div>
                `;
            } else {
                productDiv.innerHTML = `
                    <div class="list__main-product">
                        <button class="list__delete-btn"></button>
                        <p class="list__element_name">${elem.name}</p>
                        <p class="list__element">${elem.number}</p>
                        <p class="list__element">${elem.price}</p>
                    </div>
                    <div class="list__addition-product">
                        <p class="list__element_no-additions">Нет добавок</p>
                    </div>
                `;
            }
            cartList.appendChild(productDiv);
        });
    }
    makeClickable();
};

sectionRightArrows.forEach(button => {
    button.onclick = event => {
        let minLeft = 0;
        let indicators = event.target.parentNode.parentNode.parentNode.querySelectorAll(".section__indicator");
        let id = event.target.parentNode.parentNode.parentNode.id;
        let rightButton = event.target.parentNode.parentNode.parentNode.querySelector(".right img");
        let leftButton = event.target.parentNode.parentNode.parentNode.querySelector(".left img");

        if (id == "advertisementNew" || id == "advertisementStock") {
            minLeft = -4800;
        } else {
            minLeft = -2400;
        }

        sliders[id].left -= 1200;
        if (sliders[id].left < minLeft) sliders[id].left = minLeft;
        event.target.parentNode.parentNode.parentNode.getElementsByClassName("section__products-list")[0].style.left = `${sliders[id].left}px`;

        indicators.forEach(indicator => {
            indicator.className = "section__indicator";
        });
        sliders[id].page++;
        if (sliders[id].page > indicators.length - 1) sliders[id].page = indicators.length - 1;
        indicators[sliders[id].page].className = "section__indicator active";

        if (sliders[id].page == indicators.length - 1) {
            rightButton.src = "img/section-right-inactive.png";
            rightButton.parentNode.style.cursor = "default";
        } else {
            leftButton.src = "img/section-left-active.png";
            leftButton.parentNode.style.cursor = "pointer";
        }
    };
});

sectionLeftArrows.forEach(button => {
    button.onclick = event => {
        let maxLeft = 0;
        let indicators = event.target.parentNode.parentNode.parentNode.querySelectorAll(".section__indicator");
        let id = event.target.parentNode.parentNode.parentNode.id;
        let rightButton = event.target.parentNode.parentNode.parentNode.querySelector(".right img");
        let leftButton = event.target.parentNode.parentNode.parentNode.querySelector(".left img");

        if (id == "advertisementNew" || id == "advertisementStock") {
            maxLeft = 0;
        } else {
            maxLeft = 2400;
        }

        sliders[id].left += 1200;
        if (sliders[id].left > maxLeft) sliders[id].left = maxLeft;
        event.target.parentNode.parentNode.parentNode.getElementsByClassName("section__products-list")[0].style.left = `${sliders[id].left}px`;

        indicators.forEach(indicator => {
            indicator.className = "section__indicator";
        });
        sliders[id].page--;
        if (sliders[id].page < 0) sliders[id].page = 0;
        indicators[sliders[id].page].className = "section__indicator active";

        if (sliders[id].page == 0) {
            leftButton.src = "img/section-left-inactive.png";
            leftButton.parentNode.style.cursor = "default";
        } else {
            rightButton.src = "img/section-right-active.png";
            rightButton.parentNode.style.cursor = "pointer";
        }
    };
});

advertisementToggle.forEach(radio => {
    radio.onclick = event => {
        if (event.target.value == "new") {
            advertisementStock.style.display = "none";
            advertisementNew.style.display = "block";
        } else {
            advertisementNew.style.display = "none";
            advertisementStock.style.display = "block";
        }
    }
});

buttonPlus.forEach(button => {
    button.onclick = event => {
        event.target.parentNode.children[1].value = +event.target.parentNode.children[1].value + 1;
        if (event.target.parentNode.children[1].value > 99) event.target.parentNode.children[1].value = 99;
    }
});

buttonMinus.forEach(button => {
    button.onclick = event => {
        event.target.parentNode.children[1].value = +event.target.parentNode.children[1].value - 1;
        if (event.target.parentNode.children[1].value < 1) event.target.parentNode.children[1].value = 1;
    }
});

buttonSupDel.forEach(button => {
    button.onclick = event => {
        event.target.parentNode.children[0].innerHTML = 0;
    }
});

buttonSupAdd.forEach(button => {
    button.onclick = event => {
        event.target.parentNode.children[0].innerHTML = +event.target.parentNode.children[0].innerHTML + 1;
        if (event.target.parentNode.children[0].innerHTML > 9) event.target.parentNode.children[0].innerHTML = 9;
    }
});

supplementsNumber.forEach(input => {
    input.onchange = event => {
        if (event.target.value < 0) event.target.value = 0;
        if (event.target.value > 99) event.target.value = 99;
        if (!(!isNaN(parseFloat(event.target.value)) && isFinite(event.target.value))) event.target.value = 0;
    }
});

saucesSelect.forEach(select => {
    select.onchange = event => {
        event.target.parentNode.parentNode.getElementsByClassName("supplements__price_value")[0].value = sauces[event.target.value].price;
    }
});

toCartButtons.forEach(button => {
    button.onclick = event => {
        let product = {};
        let name = event.target.parentNode.getElementsByClassName("product__name")[0].innerHTML;
        let number = event.target.parentNode.getElementsByClassName("addition__output")[0].value;
        let price = event.target.parentNode.getElementsByClassName("product__price_value")[0].value;
        let supplementName = event.target.parentNode.getElementsByClassName("supplements__select")[0] === undefined ? false : event.target.parentNode.getElementsByClassName("supplements__select")[0].value;
        let supplementNumber = event.target.parentNode.getElementsByClassName("supplements__number")[0] === undefined ? false : event.target.parentNode.getElementsByClassName("supplements__number")[0].value;
        let supplementPrice = event.target.parentNode.getElementsByClassName("supplements__price_value")[0] === undefined ? false : event.target.parentNode.getElementsByClassName("supplements__price_value")[0].value;

        product["name"] = name;
        product["number"] = number;
        product["price"] = price * number;
        product["id"] = id;

        total += price * number;

        if (supplementNumber && supplementNumber > 0) {
            if (supplementName) product["supplementName"] = sauces[supplementName].name;
            if (supplementNumber) product["supplementNumber"] = supplementNumber;
            if (supplementPrice) product["supplementPrice"] = supplementPrice * supplementNumber;
            product["isSupplement"] = true;
            total += supplementPrice * supplementNumber;
        } else {
            product["isSupplement"] = false;
        }

        cart.push(product);
        cartCounter.value = cart.length;
        cartTotal.value = total;
        id += 1;
    }
});

cartButton.onclick = () => {
    createCart();
    cartBody.style.display = "block";
};

cartClose.onclick = () => {
    cartBody.style.display = "none";
};

cartBody.onclick = (event) => {
    if (event.target.id === "cart-body") cartBody.style.display = "none";
    return;
};

newsLeftArrow.onclick = () => {
    let nextNewsNumber = findChecked(indicators) - 1;
    if (nextNewsNumber < 0) nextNewsNumber = news.length - 1;
    makeChecked(indicators, nextNewsNumber);
    showElement(news, customIndicators, nextNewsNumber);
};

newsRightArrow.onclick = () => {
    let nextNewsNumber = findChecked(indicators) + 1;
    if (nextNewsNumber === news.length) nextNewsNumber = 0;
    makeChecked(indicators, nextNewsNumber);
    showElement(news, customIndicators, nextNewsNumber);
};

customIndicators.forEach(label => {
    label.onclick = () => {
        let numb = findChecked(indicators);
        makeChecked(indicators, numb);
        showElement(news, customIndicators, numb);
    }
});