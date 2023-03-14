const form = document.querySelector('#form-product');
const productList = document.querySelector('#list-products');
const total = document.querySelector('#total span');
const clearBtn = document.querySelector('#clear');
const saveBtn = document.querySelector('#save');

let products = [];

// Add a product to the list
function addProduct(productName, price) {
   // Create a product object
   const product = {
     name: productName,
     price: parseFloat(price)
   };

   // Add the product to the products array
   products.push(product);

   // Render the new product in the list
   renderProduct(product);

   // Update the total
   updateTotal();
}

// Render a product in the product list
function renderProduct(product) {
   const li = document.createElement('li');
   li.innerHTML = `${product.name}: R$ ${product.price.toFixed(2)}`;
   productList.appendChild(li);
}

// Update the list total
function updateTotal() {
   let sum = 0;

   // Sums the prices of all products
   products.forEach(function(product) {
     sum += product.price;
   });

   // Update the total element
   total.textContent = `R$ ${sum.toFixed(2)}`;
}

// Clear the list of products and the array of products
function clearList() {
   productList.innerHTML = '';
   products = [];
   updateTotal();
}

// Save the list of products in localStorage
function saveList() {
   localStorage.setItem('products', JSON.stringify(products));
}

// Load the list of products from localStorage
function loadList() {
   const savedProducts = localStorage.getItem('products');

   if (savedProducts) {
     products = JSON.parse(savedProducts);

     products.forEach(function(product) {
       renderProduct(product);
     });

     updateTotal();
   }
}

// Event to add a product when submitting the form
form.addEventListener('submit', function(event) {
   event.preventDefault();

   const productName = form.product_name.value.trim();
   const price = form.price.value.trim();

   // Check if fields are filled
   if (productName && price) {
     addProduct(productName, price);

     // Clear the form
     form.reset();
     form.product_name.focus();
   }
});

// Event to clear the list
clearBtn.addEventListener('click', function() {
   clearList();
});

// Event to save the list
saveBtn.addEventListener('click', function() {
   saveList();
});

// Load the saved product list
loadList();