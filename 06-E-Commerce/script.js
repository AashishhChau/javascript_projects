const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99,
        image: "https://picsum.photos/300?random=1",
        badge: "Sale"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 149,
        image: "https://picsum.photos/300?random=2",
        badge: "New"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 59,
        image: "https://picsum.photos/300?random=3",
        badge: "Sale"
    },
    {
        id: 4,
        name: "Bluetooth Speaker",
        price: 89,
        image: "https://picsum.photos/300?random=4",
        badge: "New"
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(productArray = products) {

    const productList =
        document.getElementById("productList");

    productList.innerHTML = "";

    productArray.forEach(product => {

        productList.innerHTML += `
            <div class="product">

                <span class="badge">
                    ${product.badge}
                </span>

                <img src="${product.image}"
                     alt="${product.name}">

                <div class="product-content">

                    <h3>${product.name}</h3>

                    <p class="price">
                        $${product.price}
                    </p>

                    <button class="button"
                        onclick="addToCart(${product.id})">

                        Add to Cart
                    </button>

                </div>

            </div>
        `;
    });
}

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    cart.push(product);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    showToast();
}

function updateCartCount() {

    document.getElementById("cartCount")
        .textContent = cart.length;
}

function showToast() {

    const toast =
        document.getElementById("toast");

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);
}

/* Search */

document.getElementById("searchInput")
    .addEventListener("input", e => {

        const keyword =
            e.target.value.toLowerCase();

        const filteredProducts =
            products.filter(product =>
                product.name
                    .toLowerCase()
                    .includes(keyword)
            );

        displayProducts(filteredProducts);
    });

displayProducts();
updateCartCount();