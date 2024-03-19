// Retrieve cart items from local storage if available
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, image, description, quantity = 1) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        // If the product already exists, update its quantity
        existingProduct.quantity += quantity;
    } else {
        // If the product doesn't exist, add it to the cart
        cart.push({ name: productName, price: price, image: image, description: description, quantity: quantity });
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    // Update cart count
    updateCartCount();
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    let itemCount = 0;
    cart.forEach(item => {
        itemCount += item.quantity;
    });
    cartCountElement.textContent = itemCount; // Update cart count
}

function displayCart() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        // Hide cart if it's empty
        document.querySelector('.cart-container').style.display = 'none';
    } else {
        cart.forEach(item => {
            // Create a row for each product
            const productRow = document.createElement('div');
            productRow.classList.add('cart-product-row');

            // Left column: Image
            const leftColumn = document.createElement('div');
            leftColumn.classList.add('column', 'left-column');

            const image = document.createElement('img');
            image.src = item.image;
            image.alt = item.name;
            leftColumn.appendChild(image);

            // Middle column: Name and price
            const middleColumn = document.createElement('div');
            middleColumn.classList.add('column', 'middle-column');

            const nameHeading = document.createElement('h3');
            nameHeading.textContent = item.name;
            middleColumn.appendChild(nameHeading);

            const priceParagraph = document.createElement('p');
            priceParagraph.textContent = `Price: $${item.price.toFixed(2)}`;
            middleColumn.appendChild(priceParagraph);

            // Right column: Quantity controls
            const rightColumn = document.createElement('div');
            rightColumn.classList.add('column', 'right-column');

            const quantityParagraph = document.createElement('p');
            quantityParagraph.textContent = `Quantity: ${item.quantity}`;
            rightColumn.appendChild(quantityParagraph);

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.classList.add('decrement');
            decrementButton.onclick = () => decrementQuantity(item);
            rightColumn.appendChild(decrementButton);

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.classList.add('increment');
            incrementButton.onclick = () => incrementQuantity(item);
            rightColumn.appendChild(incrementButton);

            // Append columns to the row
            productRow.appendChild(leftColumn);
            productRow.appendChild(middleColumn);
            productRow.appendChild(rightColumn);

            // Append the row to the cart items container
            cartItemsElement.appendChild(productRow);

            // Calculate total price
            total += item.price * item.quantity;
        });

        // Display total price
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;

        // Show cart
        document.querySelector('.cart-container').style.display = 'block';
    }
}

function decrementQuantity(item) {
    if (item.quantity === 1) {
        // If only one item left, remove it from the cart
        const itemIndex = cart.indexOf(item);
        cart.splice(itemIndex, 1);
    } else {
        item.quantity--;
    }
    updateCartCount();
    displayCart();
}

function incrementQuantity(item) {
    item.quantity++;
    displayCart();
    updateCartCount();
}

// Initialize cart display on page load
displayCart();
updateCartCount(); // Call updateCartCount function