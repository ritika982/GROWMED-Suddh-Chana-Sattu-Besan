// script.js

const PRODUCTS = {
  besan: {
    id: "besan",
    name: "Suddh Chana Besan",
    tagline: "Made from 100% Chana Dal — 25 quality tests passed product",
    netWeight: "10 kg",
    images: [
      "chana besan.jpg",
      "chana besanback.jpg"
    ],
    nutrition: [
      {nutrient:"Energy", per100:"371.8 kcal", perServe:"111.5 kcal"},
      {nutrient:"Protein", per100:"21.0 g", perServe:"6.3 g"},
      {nutrient:"Carbohydrate", per100:"58.9 g", perServe:"17.7 g"},
      {nutrient:"Total Sugar", per100:"1.8 g", perServe:"0.5 g"},
      {nutrient:"Added Sugar", per100:"0 g", perServe:"0 g"},
      {nutrient:"Fat", per100:"5.8 g", perServe:"1.7 g"},
      {nutrient:"Saturated Fat", per100:"1.5 g", perServe:"0.5 g"},
      {nutrient:"Trans Fat", per100:"0.02 g", perServe:"0.0 g"},
      {nutrient:"Sodium", per100:"68.2 mg", perServe:"20.5 mg"}
    ],
    uses:["Kadhi","Dhokla","Pakodi","Masala Mirch","Laddu & many more"],
    manufacturer:{
      name:"GROWMED NUTRITION PRIVATE LIMITED",
      address:"D-1, D-2, Industrial Area, Hajipur, Vaishali (BIHAR), 844101",
      fssai:"10422110000220"
    },
    pricePerKg: "₹120 (example)" // change as needed
  },

  sattu: {
    id: "sattu",
    name: "Suddh Chana Sattu",
    tagline: "Traditional roasted chana sattu — High protein, cooling & nutritious",
    netWeight: "1 / 2 / 5 kg (select)",
    images: [
      "sattu.jpg" // placeholder - replace if you have sattu images
    ],
    nutrition: [
      {nutrient:"Energy", per100:"~350 kcal", perServe:"~105 kcal"},
      {nutrient:"Protein", per100:"20 g", perServe:"6 g"},
      {nutrient:"Carbohydrate", per100:"55 g", perServe:"16.5 g"},
      // approximate values for sattu — replace with lab values if available
    ],
    uses:["Sattu Sharbat","Paratha stuffing","High energy drinks","Laddus"],
    manufacturer:{
      name:"GROWMED NUTRITION PRIVATE LIMITED",
      address:"D-1, D-2, Industrial Area, Hajipur, Vaishali (BIHAR), 844101",
      fssai:"10422110000220"
    },
    pricePerKg: "₹110 (example)"
  }
};


/* ---------- Utility functions ---------- */
function qs(selector){ return document.querySelector(selector)}
function qsa(selector){ return document.querySelectorAll(selector)}

function getQueryParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

/* ---------- Populate product detail page ---------- */
function renderProductDetail(){
  const id = getQueryParam("id") || "besan";
  const product = PRODUCTS[id];
  if(!product) {
    qs("#product-detail").innerHTML = "<p>Product not found.</p>";
    return;
  }

  const container = qs("#product-detail");
  container.innerHTML = `
    <h2>${product.name}</h2>
    <p class="short">${product.tagline}</p>
    <div class="product-images">
      ${product.images.map(src => `<img src="${src}" alt="${product.name}">`).join("")}
    </div>

    <div style="margin-top:12px;">
      <strong>Net Weight:</strong> ${product.netWeight} <br>
      <strong>Price (example):</strong> ${product.pricePerKg}
    </div>

    <div class="nutritional">
      <h3 style="margin-top:12px">Nutritional Information (Per 100g / Per Serve)</h3>
      <table class="table">
        <thead><tr><th>Nutrient</th><th>Per 100g</th><th>Per Serve</th></tr></thead>
        <tbody>
          ${product.nutrition.map(n => `<tr><td>${n.nutrient}</td><td>${n.per100}</td><td>${n.perServe}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>

    <div style="margin-top:12px;">
      <h3>Recommended Uses</h3>
      <ul>${product.uses.map(u=>`<li>${u}</li>`).join("")}</ul>
    </div>

    <div style="margin-top:12px;">
      <h3>Manufacturer</h3>
      <p>${product.manufacturer.name}<br>${product.manufacturer.address}<br>FSSAI: ${product.manufacturer.fssai}</p>
    </div>

    <div style="margin-top:12px; display:flex; gap:8px; align-items:center;">
      <label for="qty">Quantity (kg)</label>
      <input id="qty" type="number" value="1" min="1" style="width:80px;padding:6px;border-radius:6px;border:1px solid #ddd">
      <button id="whatsappOrder" class="btn">Order on WhatsApp</button>
      <a class="btn outline" href="contact.html">Bulk / Contact</a>
    </div>
  `;

  // Attach WhatsApp ordering
  const phone = "919934478538"; // <-- replace with your number (with country code)
  qs("#whatsappOrder").addEventListener("click", () => {
    const qty = qs("#qty").value || 1;
    const msg = encodeURIComponent(`Hi! I want to order ${qty} kg of ${product.name}. Please share price & delivery details. (App)`);
    const url = `https://wa.me/${phone}?text=${msg}`;
    window.open(url, "_blank");
  });
}

/* ---------- Initialize when on product page ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // If current page is product.html (has #product-detail)
  if(qs("#product-detail")) {
    renderProductDetail();
  }
});
