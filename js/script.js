// JS file for public version

const
    indicators = document.querySelectorAll(".news__input"),
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
    saucesSelect = document.querySelectorAll(".supplements__select");

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
        let slider = event.target.closest(".js-slider");
        let indicators = slider.querySelectorAll(".section__indicator");
        let id = slider.id;
        let rightButton = slider.querySelector(".right img");
        let leftButton = slider.querySelector(".left img");

        if (id == "advertisementNew" || id == "advertisementStock") {
            minLeft = -4800;
        } else {
            minLeft = -2400;
        }

        sliders[id].left -= 1200;
        if (sliders[id].left < minLeft) sliders[id].left = minLeft;
        slider.querySelector(".section__products-list").style.transform = `translate(${sliders[id].left}px)`;

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
        let slider = event.target.closest(".js-slider");
        let indicators = slider.querySelectorAll(".section__indicator");
        let id = slider.id;
        let rightButton = slider.querySelector(".right img");
        let leftButton = slider.querySelector(".left img");

        if (id == "advertisementNew" || id == "advertisementStock") {
            maxLeft = 0;
        } else {
            maxLeft = 2400;
        }

        sliders[id].left += 1200;
        if (sliders[id].left > maxLeft) sliders[id].left = maxLeft;
        slider.querySelector(".section__products-list").style.transform = `translate(${sliders[id].left}px)`;

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
        let parent = event.target.parentNode;

        parent.querySelector(".addition__output").value = +parent.querySelector(".addition__output").value + 1;
        if (parent.querySelector(".addition__output").value > 99) parent.querySelector(".addition__output").value = 99;
    }
});

buttonMinus.forEach(button => {
    button.onclick = event => {
        let parent = event.target.parentNode;

        parent.querySelector(".addition__output").value = +parent.querySelector(".addition__output").value - 1;
        if (parent.querySelector(".addition__output").value < 1) parent.querySelector(".addition__output").value = 1;
    }
});

buttonSupDel.forEach(button => {
    button.onclick = event => {
        event.target.parentNode.querySelector(".supplements__number").innerHTML = 0;
    }
});

buttonSupAdd.forEach(button => {
    button.onclick = event => {
        let parent = event.target.parentNode;

        parent.querySelector(".supplements__number").innerHTML = +parent.querySelector(".supplements__number").innerHTML + 1;
        if (parent.querySelector(".supplements__number").innerHTML > 9) parent.querySelector(".supplements__number").innerHTML = 9;
    }
});

saucesSelect.forEach(select => {
    select.onchange = event => {
        event.target.closest(".product__supplements").querySelector(".supplements__price_value").value = sauces[event.target.value].price;
    }
});

toCartButtons.forEach(button => {
    button.onclick = event => {
        let parent = event.target.parentNode;
        let product = {};
        let name = parent.querySelector(".product__name").innerHTML;
        let number = parent.querySelector(".addition__output").value;
        let price = parent.querySelector(".product__price_value").value;
        let supplementName = parent.querySelector(".supplements__select") === null ? false : parent.querySelector(".supplements__select").value;
        let supplementNumber = parent.querySelector(".supplements__number") === null ? false : parent.querySelector(".supplements__number").value;
        let supplementPrice = parent.querySelector(".supplements__price_value") === null ? false : parent.querySelector(".supplements__price_value").value;

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