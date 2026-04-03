let cart = [];

const cartButton = document.getElementById('cart-button');
const cartDropdown = document.getElementById('cart-dropdown');
const closeCartBtn = document.getElementById('close-cart-btn');

cartButton.addEventListener('click', () => {
  cartDropdown.style.display = 'block';
});

closeCartBtn.addEventListener('click', () => {
  cartDropdown.style.display = 'none';
});

function addToCart(name, price, btn) {
  const quantityInput = btn.previousElementSibling;
  const quantity = parseInt(quantityInput.value);

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement('li');
    li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
      <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartTotal.textContent = total;
}


document.getElementById('checkout-btn').addEventListener('click', () => {
  if(cart.length === 0){
    alert("Your cart is empty!");
    return;
  }
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(`Payment successful! Total: $${total}`);
  cart = [];
  updateCart();
});
