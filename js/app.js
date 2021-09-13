const loadProducts = () => {
    // const url = `https://fakestoreapi.com/products`;
    const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0Kd-gwiKHWGvnqtKxRvmYpdBDuePxvWPCOk-mS5_SbTUKiielG_IxZBS0`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => showProducts(data));
};
loadProducts();

let productData = {};

// show all product in UI
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <div class="single-product">
            <div class="image-container">
             <img class="product-image" src=${image}></img>
             </div>
           <div class="card-content">
            <div class="card-header" title="${product.title}">${product.title}</div>
            <p>Category: ${product.category}</p>
            <p>Total-Rating: ${product.rating.count}</p>
            <div class="product-${product.id}">
                <div class="stars-outer">
                    <div class="stars-inner"></div>
                </div>
                <span class="number-rating">${product.rating.rate}</span>
            </div>
            <h2>Price:$ ${product.price}</h2>
          <div class="card-btn"><button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary2">add to cart</button>
          <button onclick="displayDetails('${product.id}')" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-secondery2">Details</button></div>
        </div>
        `;
        document.getElementById("all-products").appendChild(div);
    }
    getRating(products);
    productData = products;
};

// display modal product details
function displayDetails(index) {
    console.log(event.target);
    const product = productData.find(
        (product) => product.id === parseInt(index)
    );
    document.getElementById(
        "product-body"
    ).innerHTML = `<div class="p-3 d-flex  justify-content-center">
    <img src="${product.image}" alt=""
      style="height: 150px; width: auto;">
    </div>
    <p><strong>Description:</strong> ${product.description}</p>
    <p><strong>Category:</strong> ${product.category}</p>`;

    document.getElementById(
        "product-footer"
    ).innerHTML = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  <button data-bs-dismiss="modal" onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-primary2">add to cart</button>`;
}

let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge(id);
    document.getElementById("total-Products").innerText = count;
    updateTotal();
};

const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// main price update function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }
};

//grandTotal update function
const updateTotal = () => {
    const grandTotal =
        getInputValue("price") +
        getInputValue("delivery-charge") +
        getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// get ratings
function getRating(products) {
    const starsTotal = 5;
    products.forEach((product) => {
        // get percentage
        const starPercentage = (product.rating.rate / starsTotal) * 100;

        // Round to nearest 10
        const starPercentageRounded = `${
            Math.round(starPercentage / 10) * 10
        }%`;

        // Set width of stars inner to percentage
        document.querySelector(
            `.product-${product.id} .stars-inner`
        ).style.width = starPercentageRounded;
    });
}

// show my cart
const showMyCard = () => {
    document.getElementById("my-cart").classList.toggle("show");
};

// show cart
document.getElementById("show-cart").onclick = showMyCard;

// hide cart
document.getElementById("hide-cart").onclick = showMyCard;
