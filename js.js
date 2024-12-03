

const products = [
    { id: "1", name: "Waffle", price: 6.50, imageUrl: "images/image-waffle-tablet.jpg", description: "Waffle with Berries" },
    { id: "2", name: "Creme Brulee", price: 7.00, imageUrl: "images/image-creme-brulee-desktop.jpg", description: "Vanilla Bean Creme Brulée" },
    { id: "3", name: "Macaron", price: 8.00, imageUrl: "images/image-macaron-desktop.jpg", description: "Macaron Mix of Five" },
    { id: "4", name: "Tiramisu", price: 5.50, imageUrl: "images/image-tiramisu-desktop.jpg", description: "Classic Tiramisu" },
    { id: "5", name: "Baklava", price: 4.00, imageUrl: "images/image-baklava-desktop.jpg", description: "Pistachio Baklava" },
    { id: "6", name: "Pie", price: 5.50, imageUrl: "images/image-meringue-desktop.jpg", description: "Lemon Meringue Pie" },
    { id: "7", name: "Cake", price: 4.50, imageUrl: "images/image-cake-desktop.jpg", description: "Red Velvet Cake" },
    { id: "8", name: "Brownie", price: 5.50, imageUrl: "images/image-brownie-desktop.jpg", description: "Salted Caramel Brownie" },
    { id: "9", name: "Panna Cotta", price: 6.50, imageUrl: "images/image-panna-cotta-desktop.jpg", description: "Vanilla Panna Cotta" }
  ];
  
  const cart = {};
  const cartItemsElement = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const productsContainer = document.getElementById("products-container");
  const cartCountElement = document.getElementById("cart-count");
  
  function updateCartCount() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    if(totalItems>0){
      const icon =document.getElementById("myIcon");
      icon.classList.add("hidden");
    }
  }
  function calculerPrixTotal(price, quantite) {
    return price * quantite;
  }
  function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;
    
    for (const id in cart) {
      const item = cart[id];
      const subtotal = item.price * item.quantity;
      total += subtotal;
  
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <div class="flex items-center justify-between" id="${id}">
          <div>
            ${item.name} <br>
            <span>${item.quantity} × @$${item.price.toFixed(2)}  $${subtotal.toFixed(2)}</span>
          </div>
          <button class="remove rounded-full border border-black" data-id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
            </button>
        </div>
        <hr class="w-[15rem]">
      `;
      cartItemsElement.appendChild(listItem);
    }
  
    cartTotalElement.textContent = total.toFixed(2);
    updateCartCount();
    
    document.querySelectorAll(".remove").forEach(button => {
      button.addEventListener("click", (event) => {
        const id = event.currentTarget.getAttribute("data-id");
        if (cart[id]) {
          delete cart[id];
        }
        updateCart();
      });
    });
  }
  
  
  
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product", "p-4", "rounded-lg", "relative");
  
    productElement.dataset.id = product.id;
  
    productElement.innerHTML = `
      <img class="h-48 object-cover rounded-md mb-4" src="${product.imageUrl}" alt="${product.name}">
      <h3 class="text-sm mb-2 text-slate-600">${product.name}</h3>
      <p class="text-m mb-2 font-semibold">${product.description}</p>
      <p class="text-lg font-bold mb-4">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart flex w-[7rem] h-[2rem] rounded-full bg-white text-xs justify-center items-center border-2 absolute top-[12rem] left-[2.75rem]"onclick="addToCart()">
        Add to Cart
      </button>
      <div class="quantity-controls bg-orange-600 flex w-[7rem] h-[2rem] rounded-full text-xs justify-center items-center border absolute  left-[3.5rem] top-[12rem] " style="display: none;">
        <button class="decrease px-2 py-1 rounded-full bg-orange-600 focus:text-white">−</button>
        <span class="quantity text-lg">1</span>
        <button class="increase px-2 py-1 rounded-full bg-orange-600 ">+</button>
      </div>
    `;
    
    productsContainer.appendChild(productElement);
  
    const addToCartButton = productElement.querySelector(".add-to-cart");
    const quantityControls = productElement.querySelector(".quantity-controls");
    const quantitySpan = productElement.querySelector(".quantity");
    const increaseButton = productElement.querySelector(".increase");
    const decreaseButton = productElement.querySelector(".decrease");
  
     function addToCart(){
      if (!cart[product.id]) {
        cart[product.id] = { name: product.name, price: product.price, quantity: 1, imageUrl: product.imageUrl };
      }
      addToCartButton.style.display = "none";
      quantityControls.style.display = "flex";
      updateCart();
    };
  
    increaseButton.addEventListener("click", () => {
      cart[product.id].quantity += 1;
      quantitySpan.textContent = cart[product.id].quantity;
      updateCart();
    });
  
    decreaseButton.addEventListener("click", () => {
      if (cart[product.id].quantity > 1) {
        cart[product.id].quantity -= 1;
        quantitySpan.textContent = cart[product.id].quantity;
        updateCart();
      }
    });
  });
  
  