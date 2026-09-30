const bundles = [
  ["1GB", 4.20], ["5GB", 15], ["10GB", 25], ["15GB", 40],
  ["20GB", 55], ["25GB", 65], ["30GB", 75], ["40GB", 90],
  ["50GB", 110], ["70GB", 130], ["100GB", 150], ["217GB", 280]
];

// DATAGO order destination (customer only sees the simple "Send Order" button).
const ORDER_WHATSAPP = "233505002562";

const grid = document.getElementById("bundleGrid");
const select = document.getElementById("bundle");
const total = document.getElementById("total");
const formMessage = document.getElementById("formMessage");

bundles.forEach(([gb, price]) => {
  const card = document.createElement("div");
  card.className = "bundle" + (gb === "20GB" ? " popular" : "");
  card.innerHTML = `<div class="gb">${gb}</div><div class="price">GH₵${price.toFixed(2)}</div><button type="button">Buy Now</button>`;
  card.addEventListener("click", () => chooseBundle(gb));
  grid.appendChild(card);

  const option = document.createElement("option");
  option.value = gb;
  option.textContent = `${gb} — GH₵${price.toFixed(2)}`;
  select.appendChild(option);
});

function chooseBundle(gb) {
  select.value = gb;
  updateTotal();
  document.getElementById("order").scrollIntoView({behavior:"smooth"});
}

function updateTotal() {
  const item = bundles.find(x => x[0] === select.value);
  total.textContent = item ? `GH₵${item[1].toFixed(2)}` : "GH₵0.00";
}

select.addEventListener("change", updateTotal);

const paymentPanel = document.getElementById("paymentPanel");
const paymentAmount = document.getElementById("paymentAmount");
const paidButton = document.getElementById("paidButton");
const paymentSuccess = document.getElementById("paymentSuccess");

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const item = bundles.find(x => x[0] === select.value);

  if (!/^0\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit Ghanaian MTN number, e.g. 0241234567.");
    return;
  }
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  paymentAmount.textContent = `GH₵${item[1].toFixed(2)}`;
  paymentPanel.classList.add("show");
  paymentSuccess.classList.remove("show");
  formMessage.textContent = "Payment instructions are shown below. After sending the money, tap I HAVE MADE PAYMENT.";
  formMessage.classList.add("show");
  paymentPanel.scrollIntoView({behavior:"smooth", block:"center"});
});

paidButton.addEventListener("click", () => {
  paymentSuccess.classList.add("show");
  formMessage.textContent = "Your payment has been submitted for verification.";
  formMessage.classList.add("show");
});

updateTotal();
