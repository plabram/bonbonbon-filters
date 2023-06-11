console.log("hello");

let products = [
  {
    img: "./assets/spring-collection.png",
    name: "Spring Collection: Pre-Order",
    stars: 5,
    votes: 3,
    price: 50,
    seller: "Bons Co"
  },
  {
    img: "./assets/extra-large-mystery.png",
    name: "Extra Large Mystery Mix Bons",
    stars: 4,
    votes: 11,
    price: 87.5,
    seller: "Bons Mystery"
  },
  {
    img: "./assets/small-mystery.png",
    name: "Small Mystery Mix Bons",
    stars: 5,
    votes: 25,
    price: 35,
    seller: "Bons Mystery"
  },
  {
    img: "./assets/flight-quartet.png",
    name: "Bon Flight Quartet",
    stars: 5,
    votes: 2,
    price: 14,
    seller: "Bons Deluxe"
  },
  {
    img: "./assets/breakfast-in-bed.png",
    name: "Breakfast in Bed Bons",
    stars: 5,
    votes: 6,
    price: 17.5,
    seller: "Bons Co"
  },
  {
    img: "./assets/vegan-cutie.png",
    name: "Vegan Cutie Bon Trio",
    stars: 5,
    votes: 2,
    price: 10.5,
    seller: "Bons Veggie"
  },
  {
    img: "./assets/cutie-fruity.png",
    name: "Cutie Fruity Bons",
    stars: 5,
    votes: 2,
    price: 17.5,
    seller: "Bons Co"
  },
  {
    img: "./assets/de-blanc.png",
    name: "Bons de Blanc",
    stars: 3,
    votes: 2,
    price: 31.5,
    seller: "Bons Deluxe"
  },
  {
    img: "./assets/album.png",
    name: "Dark Smooth Album",
    stars: 0,
    votes: 0,
    price: 10.5,
    seller: "More Chocolate"
  },
  {
    img: "./assets/cassette-tape.png",
    name: "Mix Tape Cassette",
    stars: 5,
    votes: 2,
    price: 17.5,
    seller: "More Chocolate"
  }
];

// // REPLACE STAR COUNT WITH STAR ICONS

const stars = products.map((product) => product.stars);
const starIcons = stars.map((i) => "★ ".repeat(i));

const pushStars = (objectArray, starArray) => {
  for (let index = 0; index < objectArray.length; index++) {
    objectArray[index].starIcons = starArray[index];
  }
  return objectArray;
};

pushStars(products, starIcons);
// ¿Habría sido mejor crear un nuevo array de productos y trabajar con él?

// SET UP FILTER SECTION
const filtersElement = document.querySelector(".filter");

filtersElement.innerHTML += `
<form id="filter-form">
        <div id="seller-filter" class="product-filters"></div>
        <div id="price-filter" class="product-filters"></div>
        <div class="filter-buttons">
          <button type="submit">Search</button>
          <button type="reset" id="reset-button">Clean Filters</button>
        </div>
      </form>
`;

// SET UP PRODUCTS

const productCategoryDiv = document.querySelector(".products");

const productCard = (img, name, starIcons, votes, price, seller) => {
  return `<div><img src="${img}" alt="${name}">
    <figcaption>${name}</figcaption>
    <p class="stars">${starIcons} (${votes})</p>
    <p>$${price}</p>
    <p>${seller}</p>
    <a href="http://bonbonbon.com/cart.php"><button class="product-button">Add to Cart</button></a></div>`;
};

const setUpProducts = (productArray) => {
  for (let i = 0; i < productArray.length; i++) {
    const finalProducts = productArray[i];
    productCategoryDiv.innerHTML += productCard(
      finalProducts.img,
      finalProducts.name,
      finalProducts.starIcons,
      finalProducts.votes,
      finalProducts.price,
      finalProducts.seller
    );
  }
};

setUpProducts(products);

// CREATE DYNAMIC SELLER FILTER

const sellers = products.map((products) => products.seller);
const uniqueSellers = sellers.filter((x, i, a) => a.indexOf(x) === i);

let sellersAsHTMLOptions = "";
const makeHTMLOption = (list) => {
  for (let i = 0; i < list.length; i++) {
    sellersAsHTMLOptions += `<option value="${list[i]}">${list[i]}</option>`;
  }
};
makeHTMLOption(uniqueSellers);

let sellersFullHTML = `
<label for="sellerselect">Seller<br>
</label><select name="sellers" id="sellerselect">
<option value="all" select="selected">All</option>
${sellersAsHTMLOptions}
</select>
`;

const sellerFilter = document.querySelector("#seller-filter");
sellerFilter.innerHTML += sellersFullHTML;

// CREATE PRICE FILTER

const priceFilter = document.querySelector("#price-filter");
priceFilter.innerHTML += `<label for="price">Max Price<br></label><input type="number" placeholder="$ 10" id="price">`;

// APPLY FILTERS

const applyFilters = (event) => {
  event.preventDefault();
  productCategoryDiv.innerHTML = "";
  const filterPrice = event.target.elements.price.value;
  const filterSeller = event.target.elements.sellerselect.value;
  console.log(filterPrice);
  console.log(filterSeller);
  const filteredProducts = products.filter(
    (producto) =>
      (producto.price <= filterPrice || filterPrice === "") &&
      (producto.seller === filterSeller || filterSeller === "all")
  );
  setUpProducts(filteredProducts);
};

const filtersForm = document.querySelector("#filter-form");
filtersForm.addEventListener("submit", applyFilters);

// FILTER RESET

// Me pregunto si habría sido mejor reciclar el código de arriba en applyFilters en vez de crear resetFilters?

const resetFilters = (event) => {
  productCategoryDiv.innerHTML = "";
  setUpProducts(products);
};

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", resetFilters);
