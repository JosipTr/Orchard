function displayCart() {
  const cart = document.querySelector("#notLoggedIn");
  if (!cart) {
    return;
  }
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
