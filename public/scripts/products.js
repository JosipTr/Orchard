getProducts = async () => {
  const productsContainer = document.querySelector(".products-container");
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
    const image = document.createElement("img");
    image.src = product.src;
    image.alt = product.name;
    const title = document.createElement("h1");
    title.textContent = product.name;
    const button = document.createElement("button");
    button.textContent = "Add to cart";
    button.classList.add("button-46");
    button.id = "addToCartBtn";

    section.append(image, title, button);
    productsContainer.appendChild(section);
  });
};

getProducts();
