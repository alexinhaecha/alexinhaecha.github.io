// Load all products for products.html
async function loadProducts(gridId = "product-grid") {
  const response = await fetch("products.json");
  const products = await response.json();

  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = products.map(p => `
    <div>
      <a href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.title}" width="150">
        <h2>${p.title}</h2>
      </a>
    </div>
  `).join("");
}

// Load single product for product.html
async function loadProduct(detailsId = "product-details") {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const response = await fetch("products.json");
  const products = await response.json();

  const product = products.find(p => p.id == id);
  const container = document.getElementById(detailsId);
  if (!container) return;

  if (product) {
    container.innerHTML = `
      <h1>${product.title}</h1>
      <img src="${product.image}" alt="${product.title}" width="200">
      <p>${product.description}</p>
      <h3>Skills:</h3>
      <ul>${product.skills.map(s => `<li>${s}</li>`).join("")}</ul>
      <a href="contact.html?interest=${encodeURIComponent(product.title)}">I'm Interested</a>
    `;
  } else {
    container.innerHTML = "<p>Product not found.</p>";
  }
}

// Pre-fill contact form from query parameter
function prefillContact(interestFieldSelector = "textarea") {
  const params = new URLSearchParams(window.location.search);
  const interest = params.get("interest");
  const field = document.querySelector(interestFieldSelector);
  if (interest && field) {
    field.value = `I am interested in: ${interest}`;
  }
}
