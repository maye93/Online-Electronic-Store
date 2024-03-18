// Retrieve cart items from local storage if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        cartItemsElement.innerHTML += `<div>${item.name} - $${item.price}</div>`;
        total += item.price;
    });
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function checkout() {
    // Implement checkout functionality (e.g., send order to server)
    alert('Thank you for your purchase!');
    cart = [];
    // Clear cart in local storage
    localStorage.removeItem('cart');
    displayCart();
}

// Initialize cart display on page load
displayCart();