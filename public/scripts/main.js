function displayCart() {
  const cart = document.querySelector(".fa");
  const cartStorage = localStorage.getItem("cart");
  if (!cartStorage) {
    cart.textContent = 0;
    return;
  }
  const cartTemp = JSON.parse(cartStorage);
  cart.textContent = cartTemp.length;
  return;
}

displayCart();
