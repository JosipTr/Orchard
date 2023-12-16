const loader = document.createElement("div");
loader.classList.add("loader");

const cartElement = document.querySelector("#notLoggedIn");

getProducts = async () => {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.appendChild(loader);
  const response = await fetch("http://localhost:8080/products", {
    method: "GET",
    headers: {
      Authorization: document.cookie.slice(4),
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    return location.assign("/");
  }

  const products = await response.json();
  products.forEach((product) => {
    const section = document.createElement("section");
    section.classList.add("product-item");

    const img = document.createElement("img");
    img.src = product.imageUrl;
    img.alt = product.name;

    const title = document.createElement("h1");
    title.textContent = product.name;

    const button = document.createElement("button");
    button.id = "addToCartButton";
    button.classList.add("button-46");
    button.textContent = "Add to cart";

    section.append(img, title, button);

    productsContainer.appendChild(section);

    addToCart(button, product, cartElement);
  });
  productsContainer.removeChild(loader);
};

getProducts();

addToCart = (button, product, cartElement) => {
  button.addEventListener("click", async (event) => {
    if (!cartElement) {
      const data = {
        id: product._id,
        quantity: 1,
      };
      const response = await fetch("http://localhost:8080/cart-add", {
        method: "post",
        headers: {
          Authorization: document.cookie.slice(4, 180),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      if (response.status === 201) {
        console.log(jsonData.message);
        setCookie("cart", JSON.stringify(jsonData.cart), 1);
        displayCart();
      } else {
        console.log("Something went wrong!");
      }
      return;
    }

    if (!localStorage.getItem("cart")) {
      const cart = [
        {
          product: product,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart();
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.name === product.name) {
        cart[i].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
        displayCart();
        return;
      }
    }

    const cartItem = { product: product, quantity: 1 };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    return;
  });
};

function displayCart() {
  const cart = document.querySelector("#notLoggedIn");
  if (!cart) {
    const cartLog = document.querySelector("#loggedIn");
    const cookie = getCookie("cart");
    if (!cookie) {
      cartLog.textContent = 0;
      return;
    }
    const cartTemp = JSON.parse(getCookie("cart"));
    cartLog.textContent = cartTemp.products.length;
    return;
  }
  const cartTemp = JSON.parse(localStorage.getItem("cart"));
  cart.textContent = cartTemp.length;
  return;
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

console.log(getCookie("cart"));
