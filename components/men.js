const imageFiles = [
    "tee_1.webp",
    "tee_2.webp",
    "tee_3.webp",
    "tee_4.webp",

    "cap_1.webp",
    "cap_2.webp",
    "cap_3.webp",

    "jacket_1.webp",

    "pant_1.webp",
    "pant_2.webp",
    "pant_3.webp",
    "pant_4.webp",

    "shirt_1.webp",
    "shirt_2.webp",
    "shirt_3.webp",
    "shirt_4.webp",

    "hoodie_1.webp",
    "hoodie_2.webp",
    "hoodie_3.webp",
    "hoodie_4.webp"
];

const NAME_LOOKUP = {
    "tee_1.webp": "Essential Sleevless Tee", 
    "tee_2.webp": "Threads Classic Tee",
    "tee_3.webp": "Wind Reaver Oversized Tee",
    "tee_4.webp": "Solid Drop Shoulder Tee",

    "cap_1.webp": "Wind Reaver Cap",
    "cap_2.webp": "Daily Comfort Cap",
    "cap_3.webp": "Threads Premium Cap",

    "jacket_1.webp": "Wind Reaver Settanta Jacket",

    "pant_1.webp": "Wind Reaver Relaxed Fit Pant",
    "pant_2.webp": "Baggy Jeans",
    "pant_3.webp": "Dressy Comfort Pant",
    "pant_4.webp": "Dressy Slim Fit Pant",

    "shirt_1.webp": "Striped Relaxed Fit Shirt",
    "shirt_2.webp": "Recon Relaxed Shirt",
    "shirt_3.webp": "Threads Tiger Print Shirt",
    "shirt_4.webp": "Galilee Mosaic Cotton Shirt",

    "hoodie_1.webp": "Sigil Sweatshirt",
    "hoodie_2.webp": "Solid Oversized Sweatshirt",
    "hoodie_3.webp": "Terrain Fleece Hoodie",
    "hoodie_4.webp": "Eden Jacquard Panel Hoodie"
};

const menProducts = imageFiles.map((file, idx) => {
    const prefix = file.split("_")[0];

    return {
        id: idx + 1,
        name: NAME_LOOKUP[file],
        price: Math.floor(Math.random() * 200) + 50,
        category: prefix,
        image: `images/men/${file}`,
        inStock: Math.random() > 0.30
    };
});


// STATE
let activeCategory = "all";
let onlyInStock = false;
let sortOption = "featured";


// DOM ELEMENTS
const grid = document.getElementById("menGrid");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilter = document.getElementById("closeFilter");
const overlay = document.getElementById("filterOverlay");   // ⬅ NEW
const inStockOnly = document.getElementById("inStockOnly");
const categories = document.querySelectorAll(".filter-category li");
const sortSelect = document.getElementById("sortSelect");


// ⭐ FILTER DRAWER + OVERLAY HANDLERS
filterBtn.onclick = () => {
    filterPanel.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";   // disable scroll
};

closeFilter.onclick = () => {
    filterPanel.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
};

// close by clicking outside
overlay.onclick = () => {
    filterPanel.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "auto";
};


// OTHER EVENT HANDLERS
inStockOnly.onchange = () => {
    onlyInStock = inStockOnly.checked;
    renderGrid();
};

categories.forEach(li => {
    li.onclick = () => {
        categories.forEach(el => el.classList.remove("active"));
        li.classList.add("active");
        activeCategory = li.dataset.cat;
        renderGrid();
    };
});

sortSelect.onchange = () => {
    sortOption = sortSelect.value;
    renderGrid();
};


// FILTER + SORT
function getFilteredSortedProducts() {
    let list = [...menProducts];

    if (activeCategory !== "all")
        list = list.filter(p => p.category === activeCategory);

    if (onlyInStock)
        list = list.filter(p => p.inStock);

    switch (sortOption) {
        case "priceLow":  list.sort((a, b) => a.price - b.price); break;
        case "priceHigh": list.sort((a, b) => b.price - a.price); break;
        case "nameAZ":    list.sort((a, b) => a.name.localeCompare(b.name)); break;
        case "nameZA":    list.sort((a, b) => b.name.localeCompare(a.name)); break;
    }

    return list;
}


// RENDER GRID
function renderGrid() {
    const list = getFilteredSortedProducts();

    grid.innerHTML = list.map(p => `
        <div class="men-card ${p.inStock ? "" : "sold-out"}">
            <div class="img-wrap">
                <img src="${p.image}" alt="${p.name}">
                ${p.inStock ? "" : `<span class="sold-overlay">Sold Out</span>`}
            </div>
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
        </div>
    `).join("");
}

renderGrid();
