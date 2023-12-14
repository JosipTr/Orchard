function displayCart() {
    const cart = document.querySelector(".fa");
    cart.textContent = localStorage.length - 1;
    return;
  };

  displayCart();