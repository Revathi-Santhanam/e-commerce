//email validation
const ValidateEmail = (input) => {
  let validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (input.value.match(validRegex)) {
    alert("Valid email address!");

    document.form.email.focus();

    return true;
  } else {
    alert("Invalid email address!");

    document.form.email.focus();

    return false;
  }
};

// validate form
function validateForm() {
  let name = document.getElementById("u-name");
  let email = document.getElementById("u-email");
  let password = document.getElementById("u-pass");
  let confirmPassword = document.getElementById("confirmpass");

  if (name.value == "") {
    alert("Name is required");
    return false;
  }
  if (email.value == "") {
    alert("E-mail is required");
    return false;
  }

  if (password.value == "") {
    alert("password is required");
    return false;
  }
  if (confirmPassword.value != password.value) {
    alert("password mismatch");
    return false;
  }
  return true;
}

//products
let initialProducts = [
  {
    id: 1,
    title: "Fashor",
    description: "Embroidered round-neck kurta",
    price: 549,
    thumbnail:
      "https://4.imimg.com/data4/EX/QR/MY-25863481/deededed-500x500.jpeg",
  },
  {
    id: 2,
    title: "Skylee",
    description: "Embellished kurta set",
    price: 899,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFefo6y3ffONLPq7K3r25ijZXqzLXdzKIXk0T2yDMhR9H-9x4msyhOYrat71L-W44PMtM&usqp=CAU",
  },
  {
    id: 3,
    title: "DNMX",
    description: "Shirt with patch pockets",
    price: 1249,
    thumbnail:
      "https://glaminati.com/wp-content/uploads/2022/03/popular-casual-outfits-plaid-shirt-ripped-jeans-carodaur-your-new-style.jpg",
  },
  {
    id: 4,
    title: "Trend arrest",
    description: "Striped skirt with side slit",
    price: 280,
    thumbnail:
      "https://i.pinimg.com/1200x/f1/38/fd/f138fdd49a615750a07425b94fbc57ff.jpg",
  },
  {
    id: 5,
    title: "Urbano Fashion",
    description: "High-rise flared jeans",
    price: 280,
    thumbnail:
      "https://m.media-amazon.com/images/I/71yPmhBDu+L._AC_UY1100_.jpg",
  },
  {
    id: 6,
    title: "Miss Chase",
    description: "Denim dungarees with insert pockets",
    price: 799,
    thumbnail:
      "https://image.made-in-china.com/202f0j00yHhYzKPcbtoj/Ladies-Jean-Wholesale-Fashion-Stock-Denim-Fashion-Clothes-Women-Clothing-Apparel-Jumpsuit-Jeans.jpg",
  },
  {
    id: 7,
    title: "Peter England",
    description: "Casual Shirt with checked",
    price: 280,
    thumbnail:
      "https://imagescdn.planetfashion.in/img/app/product/6/624331-6043557.jpg?auto=format&w=494.40000000000003",
  },
  {
    id: 8,
    title: "Fort Collins",
    description: "Single Breasted coat with notched lapel",
    price: 280,
    thumbnail:
      "https://www.themanual.com/wp-content/uploads/sites/9/2023/06/fashion-man-suit-tie-jacket.jpg-e1686966166999.jpg?p=1",
  },
  {
    id: 9,
    title: "New In",
    description: "Casual wear",
    price: 280,
    thumbnail:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/300948748LTBEIGE_1.jpg?v=1694437344",
  },
];

//initial users
let initialUsers = [
  { id: 1, email: "user1@user.com", password: "user1" },
  { id: 2, email: "user2@user.com", password: "user2" },
  { id: 3, email: "user3@user.com", password: "user3" },
];

let admins = [
  { id: 1, email: "admin1@admin.com", password: "admin1" },
  { id: 2, email: "admin2@admin.com", password: "admin2" },
];

window.addEventListener("load", () => {
  if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  if (localStorage.getItem("admin") == null) {
    localStorage.setItem("admin", JSON.stringify(admins));
  }
  if (localStorage.getItem("products") == null) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
  if (location.pathname === "/admin/adminHome.html") {
    adminHomePage();
  }
  if (location.pathname === "/user/Homepage.html") {
    userHomePage();
  }
  // if (location.pathname === "/user/Signin.html") {
  //   userSignIn();
  // }
  if (location.pathname === "/user/cart.html") {
    loadCartPage();
  }

  if (location.pathname === "/user/orders.html") {
    loadOrderPage();
  }

  if (location.pathname === "/admin/adminOrders.html") {
    loadAdminOrderPage();
  }

  if (
    location.pathname === "/user/Homepage.html" ||
    location.pathname === "/user/orders.html" ||
    location.pathname === "/user/cart.html"
  ) {
    cartCount();
  }

  if (location.pathname === "/admin/addproducts.html") {
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    if (productId) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productId)
      );
      populateProduct(product);
    }
  }
});

//randam number
const randomNum = (max = 1000) => {
  return Math.floor(Math.random() * max);
};
//create user id
const randomId = (type = "users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const idRan = randomNum();
    return idRan;
    // const checkingId = jsonArray.find((obj) => obj.id === idRan);
    // if (!checkingId) {
    // }
  }
};

console.log(randomId());

//register new user into local storage

function register() {
  event.preventDefault();
  let name = document.getElementById("u-name").value;
  let email = document.getElementById("u-email").value;
  let password = document.getElementById("u-pass").value;
  let confirmPassword = document.getElementById("confirmPass").value;
  let errRef = document.getElementById("err");
  if (name.length > 0) {
    if (email.length > 0 && ValidateEmail(document.form.email)) {
      if (password > 0) {
        if (password.value === confirmPassword.value) {
          const user = JSON.parse(localStorage.getItem("users"));
          user.push({
            id: randomId(),
            email: email,
            password: password,
          });
          let json = JSON.stringify(user);
          localStorage.setItem("users", json);
          location.href = "/user/Signin.html";
        } else {
          errRef.innerText = "Password mismatch!!!";
        }
      } else {
        errRef.innerText = "enter your password....";
      }
    } else {
      errRef.innerText = "enter your email....";
    }
  } else {
    errRef.innerText = "enter your name,....";
  }
  // console.log("user added");
}

//User Sign in

const userSignIn = () => {
  event.preventDefault();
  {
    let email = document.getElementById("email").value;
    let invalidRef = document.getElementById("invalid");
    let pdw = document.getElementById("password").value;

    let userRecords = new Array();
    userRecords = JSON.parse(localStorage.getItem("users"))
      ? JSON.parse(localStorage.getItem("users"))
      : [];
    if (
      userRecords.some((v) => {
        return v.email === email && v.password === pdw;
      })
    ) {
      let current_user = userRecords.filter((v) => {
        return v.email === email && v.password === pdw;
      })[0];
      localStorage.setItem("email", current_user.email);
      localStorage.setItem("password", current_user.password);
      sessionStorage.setItem("userId", current_user.id);

      location.href = "/user/Homepage.html";
      // alert("Login Pass");
    } else {
      // alert("Login Fail");
      invalidRef.innerText = "Invalid credentials";
    }
  }
};

// user signout
const logout = () => {
  sessionStorage.removeItem("userId");
  location.replace("/main.html");
};

//admin sign in
// const adminSignIn = () => {
//   {
//     let adminEmail = document.getElementById("a-email").value;
//     let invalidRef = document.getElementById("invalid");
//     let adminPass = document.getElementById("a-password").value;

//     let adminRecords = [];
//     adminRecords = JSON.parse(localStorage.getItem("admin"))
//       ? JSON.parse(localStorage.getItem("admin"))
//       : [];
//     if (
//       adminRecords.some((v) => {
//         return v.email == adminEmail && v.password == adminPass;
//       })
//     ) {
//       let currentAdmin = adminRecords.filter((v) => {
//         return v.email == adminEmail && v.password == adminPass;
//       })[0];
//       localStorage.setItem("email", currentAdmin.email);
//       localStorage.setItem("password", currentAdmin.password);
//       // sessionStorage.setItem("userId", currentAdmin.id);
//       location.href = "/admin/adminHome.html";

//     } else {
//       invalidRef.innerText="Invalid credentials";
//     }
//   }
// };
const adminSignIn = () => {
  {
    let adminEmail = document.getElementById("a-email").value;
    let invalid = document.getElementById("invalid");
    let adminPass = document.getElementById("a-password").value;

    let adminRecords = [];
    adminRecords = JSON.parse(localStorage.getItem("admin"))
      ? JSON.parse(localStorage.getItem("admin"))
      : [];
    if (
      adminRecords.some((v) => {
        return v.email == adminEmail && v.password == adminPass;
      })
    ) {
      let currentAdmin = adminRecords.filter((v) => {
        return v.email == adminEmail && v.password == adminPass;
      })[0];
      localStorage.setItem("email", currentAdmin.email);
      localStorage.setItem("password", currentAdmin.password);
      sessionStorage.setItem("adminId", currentAdmin.id);
      location.replace("/admin/adminHome.html");
      // alert("success");
    } else {
      invalid.innerText = "Fail";
    }
  }
};

//admin home page
const adminHomePage = () => {
  const productsRef = document.getElementById("loadProductInAdminPage");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<tr>
    <td><img src="${
      product.thumbnail
    }" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProduct(${
        product.id
      })">Edit</button>
      <button class="btn btn-danger" onClick="deleteProduct(${
        product.id
      })">Delete</button>
    </td>
  </tr>`;
  }

  productsRef.innerHTML = body;
};

//add and update products to admin page
const addOrUpdate = () => {
  const idRef = document.getElementById("id");
  const titleRef = document.getElementById("p-title");
  const priceRef = document.getElementById("p-price");
  const descRef = document.getElementById("prod-desc");
  const imgRef = document.getElementById("add-image");
  const toastRef = document.getElementById("toast");
  const toastMessageRef = document.getElementById("toastMessage");

  let prods = JSON.parse(localStorage.getItem("products"));

  let id = idRef.value;
  if (id) {
    const product = prods.find((product) => product.id === parseInt(id));

    prods = prods.filter((product) => product.id !== parseInt(id));
    prods.push({
      ...product,
      title: titleRef.value,
      description: descRef.value,
      price: priceRef.value,
      thumbnail: imgRef.value,
    });
    toastMessageRef.innerText = "Product  updated successfully!!!";
  } else {
    prods.push({
      id: randomId("products"),
      title: titleRef.value,
      description: descRef.value,
      price: priceRef.value,
      thumbnail: imgRef.value,
    });
    toastMessageRef.innerText = "Product added successfully!!!";
  }
  toastRef.classList.add("fade", "show");

  setTimeout(() => {
    toastRef.classList.remove("fade", "show");
  }, 2000);

  let json = JSON.stringify(prods);
  localStorage.setItem("products", json);
  location.href = "/admin/adminHome.html";
};

// delete product from admin page
const deleteProduct = (id) => {
  const prods = JSON.parse(localStorage.getItem("products"));
  const filteredProds = prods.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProds));
  adminHomePage();
};

// edit product from admin page
const editProduct = (id) => {
  location.href = `/admin/addproducts.html?id=${id}`;
};

//populate product
const populateProduct = (product) => {
  const idRef = document.getElementById("id");
  const editRef = document.getElementById("edit");
  const titleRef = document.getElementById("p-title");
  const priceRef = document.getElementById("p-price");
  const descRef = document.getElementById("prod-desc");
  const imageRef = document.getElementById("add-image");
  const btnRef = document.getElementById("btn");

  idRef.value = product.id;
  titleRef.value = product.title;
  priceRef.value = product.price;
  descRef.value = product.description;
  imageRef.value = product.thumbnail;
  editRef.innerText = "Edit Product";
  btnRef.innerText = "Update Product";
};

// loading products in home page
const userHomePage = () => {
  const productsRef = document.getElementById("productsDisplay");
  const products = JSON.parse(localStorage.getItem("products"));

  let prod = "";
  for (let product of products) {
    prod += `<div class="col-4 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:150px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onClick="addToCart(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }

  productsRef.innerHTML = prod;
};

//add to cart in user page
const addToCart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/user/Signin.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount();
  }
};

// cart count increase
const cartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/user/Signin.html";
};

//load cart
const loadCartPage = () => {
  const cartRef = document.getElementById("cartBody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("cart");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        tableRef.classList.remove("visually-hidden");
        emptyCartRef.classList.add("visually-hidden");
      } else {
        emptyCartRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.title}</td>
                  <td><img src="${cartItem.thumbnail}" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
                  <td><div class="d-flex flex-row  align-items-center qty"><i class="fa fa-minus text-danger me-2"></i>
                  <h5 class="text-grey mt-1 mr-1 ml-1">${cartItem.count}</h5><i class="fa fa-plus ms-2 text-success"></i></div></td>
                  <td>${cartItem.price}</td>
                  <td>₹ ${count}</td>
                  <td><button  class="btn btn-outline-danger ms-5 text-danger" onclick="delCartProduct(${cartItem.id})">Delete</button></td>
                </tr>`;
      }
      cartRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/user/Signin.html";
    }
  }
};

//delete cart product
const delCartProduct = (id) => {
  const prods = JSON.parse(localStorage.getItem("cart"));
  const filteredProds = prods.filter((product) => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(filteredProds));
  loadCartPage();
};

// checkOutHandler
const checkOutHandler = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      cartCount();
      location.href = "/user/Homepage.html";
    } else {
      location.href = "/user/Homepage.html";
    }
  } else {
    location.href = "/user/Signin.html";
  }
};

// loading order in user Page
const loadOrderPage = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }
      tableRef.innerHTML = body;
    } else {
      location.href = "/user/Homepage.html";
    }
  } else {
    location.href = "/user/Signin.html";
  }
};

// loading orders in admin page
const loadAdminOrderPage = () => {
  const orderRef = document.getElementById("adminOrders");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let body = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const users = JSON.parse(localStorage.getItem("users"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${orderedUser.email}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>
              <select class="form-select" id="status-${order.timestamp}">
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }
      orderRef.innerHTML = body;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/user/Homepage.html";
    }
  } else {
    location.href = "/user/Signin.html";
  }
};
