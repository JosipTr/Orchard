const loader = document.createElement("div");
loader.classList.add("loader");

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

    addToCart(button, product);
  });
  productsContainer.removeChild(loader);
};

getProducts();

addToCart = (button, product) => {
  button.addEventListener("click", (event) => {
    if (!localStorage.getItem("cart")) {
      const cart = [
        {
          product: product,
          quantity: 1,
        },
      ];
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].product.name === product.name) {
        cart[i].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log(cart);
        return;
      }
    }

    const cartItem = { product: product, quantity: 1 };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    return;
  });
};
