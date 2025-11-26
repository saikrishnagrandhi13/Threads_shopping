const imageFiles = [
    "tee_1.webp",
    "tee_2.webp",
    "tee_3.webp",
    "tee_4.webp",

    "cap_1.webp",
    "cap_2.webp",
    "cap_3.webp",
    "cap_4.webp",

    "dress_1.webp",

    "bottom_1.webp",
    "bottom_2.webp",
    "bottom_3.webp",
    "bottom_4.webp",

    "top_1.webp",
    "top_2.webp",
    "top_3.webp",

    "outwear_1.webp",
    "outwear_2.webp",
    "outwear_3.webp",
    "outwear_4.webp"
];

const NAME_LOOKUP = {
    "tee_1.webp": "Elemental Cropped Tee", 
    "tee_2.webp": "Aegis Relaxed Tee",
    "tee_3.webp": "The Four Continents Cropped Tee",
    "tee_4.webp": "Alpha Cross Ribbed Tank Top",

    "cap_1.webp": "Alpha Cross Embroidered Beanie",
    "cap_2.webp": "Alpha Cross Embroidered Beanie",
    "cap_3.webp": "Wind Reaver Cap",
    "cap_4.webp": "Logo Embroidered Cap",

    "dress_1.webp": "Dream of The Orient Midi Dress",

    "bottom_1.webp": "Sinai Pleated Skirt",
    "bottom_2.webp": "Paris Mid-Rise Cotton Pants",
    "bottom_3.webp": "Dream of The Orient Midi Skirt",
    "bottom_4.webp": "Plaid Panel Skirt",
    
    "top_1.webp": "Dream of The Orient Swim Wear Top",
    "top_2.webp": "Meridian Knit Top",
    "top_3.webp": "Dream of The Orient Sami Top",

    "outwear_1.webp": "Constructed Artist Jacket",
    "outwear_2.webp": "Solstice Jacket with Kardana Logo",
    "outwear_3.webp": "Mandrake Camo Net Zip Hoodie",
    "outwear_4.webp": "Alpha Cross Embroidered Sweatshirt",
};

const menProducts = imageFiles.map((file, idx) => {
    const prefix = file.split("_")[0];

    return {
        id: idx + 1,
        name: NAME_LOOKUP[file],
        price: Math.floor(Math.random() * 200) + 50,
        category: prefix,
        image: `images/women/${file}`,
        inStock: Math.random() > 0.20
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