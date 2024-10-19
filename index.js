// JavaScript code for index.js

// Variables to store booking information
let bookings = [];

// Elements for form, buttons, and summary list
const bookingForm = document.getElementById("bookingForm");
const bookingSummary = document.getElementById("bookingSummary");
const summaryList = document.getElementById("summaryList");
const viewBookingSummaryButton = document.getElementById("viewBookingSummary");
const paymentForm = document.getElementById("paymentForm");

// Get package dropdown and price input elements
const packageDropdown = document.getElementById("package");
const priceInput = document.getElementById("price");

// Toggle Dark Mode
const toggleButton = document.createElement("button");
toggleButton.textContent = "Toggle Dark Mode";
document.body.appendChild(toggleButton);

// Event listener for package selection to display price
packageDropdown.addEventListener("change", (event) => {
  const selectedPackage = event.target.value;
  let price = "";

  if (selectedPackage === "Beach Getaway") price = "500";
  else if (selectedPackage === "Mountain Hiking") price = "750";
  else if (selectedPackage === "City Exploration") price = "600";

  priceInput.value = price;
});

// Add Booking Button
bookingForm.children[5].addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const packageSelected = packageDropdown.value;
  const price = priceInput.value;

  if (name && packageSelected && price) {
    bookings.push({ name, package: packageSelected, price });
    alert(`Booking for ${name} has been added.`);
  } else {
    alert("Please fill out all booking details.");
  }
});

// New Booking Button
bookingForm.children[6].addEventListener("click", () => {
  document.getElementById("name").value = "";
  packageDropdown.value = "";
  priceInput.value = "";
  alert("You can start a new booking.");
});

// Delete Last Booking Button
bookingForm.children[7].addEventListener("click", () => {
  if (bookings.length > 0) {
    bookings.pop();
    alert("Last booking has been deleted.");
  } else {
    alert("No bookings to delete.");
  }
});

// View Booking Summary Button
viewBookingSummaryButton.addEventListener("click", () => {
  summaryList.innerHTML = "";
  if (bookings.length === 0) {
    summaryList.innerHTML = "<li>No bookings available.</li>";
  } else {
    bookings.forEach((booking, index) => {
      const bookingItem = document.createElement("li");
      bookingItem.textContent = `${index + 1}. ${booking.name} - ${
        booking.package
      } - $${booking.price}`;
      summaryList.appendChild(bookingItem);
    });
  }
  bookingSummary.style.display = "block";
});

// Payment Form Submission
paymentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const cardNumber = document.getElementById("cardNumber").value;
  const expiry = document.getElementById("expiry").value;
  const cvv = document.getElementById("cvv").value;

  if (cardNumber && expiry && cvv) {
    alert("Payment Successful!");
    paymentForm.reset();
  } else {
    alert("Please fill out all payment details.");
  }
});

// Dark Mode Toggle
let darkMode = false;
toggleButton.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.style.backgroundColor = darkMode ? "#333" : "#fff";
  document.body.style.color = darkMode ? "#fff" : "#000";
});
// script.js
document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
});

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/products');
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function displayProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = ''; // Clear existing content

  products.forEach((product) => {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');

    productDiv.innerHTML = `
      <h2>${product.name}</h2>
      <p>Price: $${product.price}</p>
      <p>In Stock: ${product.inStock ? 'Yes' : 'No'}</p>
    `;

    container.appendChild(productDiv);
  });
}
