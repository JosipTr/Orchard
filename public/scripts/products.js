const loader = `<div class="loader"></div>`;

getProducts = async () => {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = loader;
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
  let result = '';
  const products = await response.json();
  products.forEach((product) => {
    result += `
    <section class="product-item">
    <img src="${product.imageUrl}" alt="${product.name}">
    <h1>${product.name}</h1>
    <button id="addToCartButton" class="button-46">Add to cart</button>
    </section>
    `;
    productsContainer.innerHTML = result;
  });
};

getProducts();