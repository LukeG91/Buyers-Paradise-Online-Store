// Declaring a variable to target all of the shopping cart options on the catalogue page.

let shoppingCarts = document.querySelectorAll(".addToCart");

// Declaring a variable that stores an array of the product objects on the catalogue page.

let productItems = [
  {
    productName: "Nike Designer Hats",
    productTag: "nikedesignerhats",
    productPrice: 399,
    productIsInCart: 0,
  },
  {
    productName: "Ladies Designer Hats",
    productTag: "ladiesdesignerhats",
    productPrice: 299,
    productIsInCart: 0,
  },
  {
    productName: "Ladies Designer Peak Caps",
    productTag: "ladiesdesignerpeakcaps",
    productPrice: 399,
    productIsInCart: 0,
  },
  {
    productName: "Brazil Football Jersey",
    productTag: "brazilfootballjersey",
    productPrice: 999,
    productIsInCart: 0,
  },
  {
    productName: "Plain T-Shirts",
    productTag: "plaint-shirts",
    productPrice: 299,
    productIsInCart: 0,
  },
  {
    productName: "Ladies Designer Jersey",
    productTag: "ladiesdesignerjersey",
    productPrice: 799,
    productIsInCart: 0,
  },
  {
    productName: "Blue Suede Shoes",
    productTag: "Bluesuedeshoes",
    productPrice: 1299,
    productIsInCart: 0,
  },
  {
    productName: "Designer Nikes",
    productTag: "designernikes",
    productPrice: 2999,
    productIsInCart: 0,
  },
  {
    productName: "Designer Nike Shoes",
    productTag: "designernikeshoes",
    productPrice: 1599,
    productIsInCart: 0,
  },
  {
    productName: "Nike Airforce Shoes",
    productTag: "nikeairforceshoes",
    productPrice: 2999,
    productIsInCart: 0,
  },
  {
    productName: "Nike Training Shoes",
    productTag: "niketrainingshoes",
    productPrice: 1999,
    productIsInCart: 0,
  },
  {
    productName: "Salomon Trail Running Shoes",
    productTag: "salomontrailrunningshoes",
    productPrice: 3999,
    productIsInCart: 0,
  },
];

/* =================================================================================================================== */

// Creating a for loop to loop through all of the cart options on the catalogue page and add an event listener to them.

for (let i = 0; i < shoppingCarts.length; i++) {
  /* I am looping through the elements in the shoppingCarts variable and I am applying a click event
       to all of the shopping cart options (Add Item To Cart) on the catalogue page, I am targeting each item in the 
       productItems array and am applying two functions to each item in the productItems array using [i].  */
  shoppingCarts[i].addEventListener("click", () => {
    amountOfItemsIncart(productItems[i]);
    totalCost(productItems[i]);
  });
}

/* =================================================================================================================== */

// Creating a function to check if there have been items added to the cart when the page loads.

function checkCartItems() {
  /* Retrieving the value from local storage using the "itemsInCart" key and assigning it to a 
    variable called numberOfProducts. */
  let numberOfProducts = localStorage.getItem("itemsInCart");

  /* Using an if statement to check if numberOfProducts exists in local storage and if it does, the information is being
     added to the span tag with the class name of "amountOfItems" on the cart page using the .innerHTML operator.  */
  if (numberOfProducts) {
    document.querySelector(".amountOfItems").innerHTML = numberOfProducts;
  }
}

/* =================================================================================================================== */

// Creating a function to display the amount of items that have been added to the cart.

function amountOfItemsIncart(productItem, action) {
  /* Declaring a variable and setting it to contain the value linked to "itemsInCart" in local storage. */
  let numberOfProducts = localStorage.getItem("itemsInCart");

  /* Converting the numberOfProducts variable to a Number. */
  numberOfProducts = Number(numberOfProducts);

  /* Declaring a variable and storing the data from local storage with the key of 'productsInCart' and I am converting it
     from a string to a JavaScript object. */
  let itemsInTheCart = localStorage.getItem("productsInCart");
  itemsInTheCart = JSON.parse(itemsInTheCart);

  /* Creating an if statement to check if the action is equal to 'remove', if it is then the local storage with the key 'itemsInCart' will be updated and the amount of items shown in the cart on the web page will be updated. If there are exisiting items in the cart, then the number of items in the cart will be increased.*/

  if (action === "remove") {
    localStorage.setItem("itemsInCart", numberOfProducts - 1);
    document.querySelector(".cart a span").textContent = numberOfProducts - 1;
  } else if (numberOfProducts) {
    localStorage.setItem("itemsInCart", numberOfProducts + 1);
    document.querySelector(".cart a span").textContent = numberOfProducts + 1;
  } else {
    localStorage.setItem("itemsInCart", 1);
    document.querySelector(".cart a span").textContent = 1;
  }

  /* Calling the setProducts function and passing in productItem as an argument which will be each element in the
     productItems array.*/

  setProducts(productItem);
}

/* =================================================================================================================== */

/* Creating a function to get the product tag of the product that is being added to the cart
   and to show the amount of times the product has been added to the cart. */

function setProducts(productItem) {
  /* Delcaring a variable to contain the values from local storage that are linked to the "productsInCart" key. */
  let itemsInThecart = localStorage.getItem("productsInCart");
  /* Converting the items in the "itemsInThecart" variable from a string to an object. */
  itemsInThecart = JSON.parse(itemsInThecart);

  /* Using an if statement to check if the 'itemsInThecart' variable is not equal to null.  */
  if (itemsInThecart != null) {
    /* Using another if statement to see if the product tag is undefined, and if it is, itemsInThecart will
         be updated to an object and will collect everything that is linked to itemsInThecart originally using the Rest 
         operator.  */
    if (itemsInThecart[productItem.productTag] == undefined) {
      itemsInThecart = {
        ...itemsInThecart,
        [productItem.productTag]: productItem,
      };
    }
    /* Updating the 'productIsInCart' attribute to increased by 1. */
    itemsInThecart[productItem.productTag].productIsInCart += 1;
  } else {
    /* If there is nothing yet linked to 'itemsInThecart' then set set the 'productIsInCart' attribute to 1. */
    productItem.productIsInCart = 1;
    itemsInThecart = {
      [productItem.productTag]: productItem,
    };
  }
  /* Setting local storage to contain a key of "productsInCart" and pass in 'itemsInThecart' as the value and convert it
     into a string. */
  localStorage.setItem("productsInCart", JSON.stringify(itemsInThecart));
}

/* =================================================================================================================== */

// Creating a function to calculate the total cost of the items selected by the user.

function totalCost(product, action) {
  /* Creating a variable to contain the values linked to the "totalCostofItems" key in local storage. */
  let totalCostOfCart = localStorage.getItem("totalCostofItems");

  if (action === "remove") {
    totalCostOfCart = Number(totalCostOfCart);
    localStorage.setItem(
      "totalCostofItems",
      totalCostOfCart - product.productPrice
    );
  } else if (totalCostOfCart != null) {
    /* Checking to see if the 'TotalCostOfCart' variable is not equal to null.  If it is not equal to null
     then the 'TotalCostOfCart' variable gets converted to a Number and localstorage with the key of "totalCostofItems" is
     updated to show the price after the item that the user has selected has been added. */
    totalCostOfCart = Number(totalCostOfCart);
    localStorage.setItem(
      "totalCostofItems",
      totalCostOfCart + product.productPrice
    );
    /* If localstorage with the key of 'totalCostofItems' is equal to null then localstorage will be updated with the price
       of the product that the user has selected. */
  } else {
    localStorage.setItem("totalCostofItems", product.productPrice);
  }
}

/* =================================================================================================================== */

/* Creating a function to display an alert with the current cart total when the customer adds a new product to the cart.  */

function displayCartTotal() {
  let currentCartCost = localStorage.getItem("totalCostofItems");
  currentCartCost = Number(currentCartCost);
  let addItemToCart = document.querySelectorAll(".addToCart");

  /* Using a for loop to add click events to all HTML elements with the 'addToCart'class and then am displaying an alert
  with the current cart total. */

  for (i = 0; i < addItemToCart.length; i++) {
    addItemToCart[i].addEventListener("click", () => {
      location.reload();
      alert(
        "Your current total is: R" +
          currentCartCost +
          " excluding Vat.  Navigate to the cart page to see the total cost including vat."
      );
    });
  }
}

displayCartTotal();

/* =================================================================================================================== */

/* Writing code to update the total cost if a discount coupon is applied. */
/* Valid coupon codes:
   winterSale2021  --> 25% off
   bestBargain2021 --> 50% off 
*/
function couponCodes() {
  /* Declaring variables to get the value from the input field and the total cart cost from the HTML element storing it. */
  let couponInput = document.getElementById("couponInput").value;
  let cartCost = document
    .getElementById("finalCartCost")
    .innerHTML.replace(/R/g, "");
  let finalCartCost = document.getElementById("finalCartCost");

  /* Converting the 'cartCost' variable to a number. */
  cartCost = Number(cartCost);

  /* Using a for loop to see what coupon code was entered by the user and then to apply the relevant discount and display
     the new total cost in an alert and update the Totalcost on the cart page. */
  if (couponInput === "winterSale2021") {
    cartCost = cartCost - (cartCost * 25) / 100;
    alert("Your current total is R" + cartCost.toFixed(2));
    finalCartCost.innerHTML = `R${cartCost.toFixed(2)}`;
  } else if (couponInput === "bestBargain2021") {
    cartCost = cartCost - (cartCost * 50) / 100;
    alert("Your current total is R" + cartCost.toFixed(2));
    finalCartCost.innerHTML = `R${cartCost.toFixed(2)}`;
  } else {
    alert("No discount for you.");
  }
}

/* =================================================================================================================== */

/* Writing code to update the total cost of the cart if delivery options are selected by the customer. */

function deliveryCost() {
  let localExpress = document.getElementById("localExpress");
  let internationalExpress = document.getElementById("internationalExpress");
  let submitButton = document.getElementById("deliveryOptionsSubmitButton");
  let cartCost = document
    .getElementById("finalCartCost")
    .innerHTML.replace(/R/g, "");
  let finalCartCost = document.getElementById("finalCartCost");

  /* Converting the 'cartCost' variable to a number. */
  cartCost = Number(cartCost);

  /* Using an if statement to check which radio button is checked and then to update the total cart cost accordingly and 
   display and alert to the customer with the new total cost.*/

  submitButton.addEventListener("click", () => {
    if (localExpress.checked) {
      cartCost = cartCost + 100;
      finalCartCost.innerHTML = `R${cartCost.toFixed(2)}`;
      alert("Your current total is: R" + cartCost.toFixed(2));
    } else if (internationalExpress.checked) {
      cartCost = cartCost + 300;
      finalCartCost.innerHTML = `R${cartCost.toFixed(2)}`;
      alert("Your current total is: R" + cartCost.toFixed(2));
    } else {
      alert("no extra charge.");
    }
  });
}

/* =================================================================================================================== */

/* Creating a function to display the items that the customer has added to the cart on the cart page.  This function will run 
when the page loads to check if there are any items in the local Storage. */

function displayItemsInCart() {
  /* Declaring a variable to contain the values within localstorage that are linked to the "productsInCart" key. */
  let itemsIncart = localStorage.getItem("productsInCart");

  /* Converting the itemsInCart from a string to a JavaScript object. */
  itemsIncart = JSON.parse(itemsIncart);

  /* Declaring a variable and setting it to the div element with the 'customerProductsContainer' class name on the cart page. */
  let customerProducts = document.querySelector(".customerProductsContainer");

  /* Declaring a variable to contain the values from local storage with the 'totalCostofItems' key. */
  let totalCostOfCart = localStorage.getItem("totalCostofItems");

  /* Using an if statement to check weather itemsIncart exists and if the 'customerProducts' element exists on the web page.  */
  if (itemsIncart && customerProducts) {
    /* Initially when the page loads, the element should be empty. */
    customerProducts.innerHTML = "";
    /* Looping through all of the objects within the 'itemsIncart' variable and checking the values of the items in the cart. */
    Object.values(itemsIncart).map((entry) => {
      /* Adding the products to the web page. */
      customerProducts.innerHTML += `
        <div class="chosenProduct">
            <ion-icon class="removeOption" name="close-circle-outline"></ion-icon>
            <img src="../images/${entry.productTag}.jpg">
            <span class="chosenProductTitleSpan">${entry.productName}</span>
        </div>
        <div class="chosenProductPrice">R${entry.productPrice},00</div>
        <div class="chosenProductQuantity">
            <ion-icon class="remove" name="caret-back-circle-outline"></ion-icon>
            <span class="chosenProductQuantitySpan">${
              entry.productIsInCart
            }</span>
            <ion-icon class="add" name="caret-forward-circle-outline"></ion-icon>
        </div>
        <div class="totalCost">
            R${
              entry.productIsInCart * entry.productPrice
              // entry.productIsInCart * entry.productPrice* (15 / 100)
            }
        </div>
        `;
    });

    /* Converting the 'totalCostOfCart' items in local storage to a JavaScript object and am declaring two variables to
       get the cost of vat and then add that to the cost of the item. */

    totalCostOfCart = JSON.parse(totalCostOfCart);
    let vatCost = totalCostOfCart * (15 / 100);
    let totalCost = totalCostOfCart + vatCost;

    customerProducts.innerHTML += `
        <div class="totalCostContainer">
            <h5 class="totalCostOfCartTitle">
                Cart Total <br> Inc Vat:
            </h5>
            <h5 id="finalCartCost" class="totalCostOfCart">
            R${totalCost}
            </h5>
            
    `;
  }

  /* Calling the 'removeItemsFromCart' function. */

  removeItemsFromCart();
  updateProductQuantity();
}

/* =================================================================================================================== */

/* Creating a function to remove items from the shopping cart. */

function removeItemsFromCart() {
  /* Creating a variable to store all of the 'ion-icon'elements within the div that has the
     class name of 'chosenProduct'. */
  let removeButtons = document.querySelectorAll(".removeOption");
  /* Creating an empty variable */
  let nameOfSelectedproduct;
  /* Getting the initial amount of products that we have oin local storage. */
  let amountOfProducts = localStorage.getItem("itemsInCart");
  /* setting a variable to contain the local storage value with the key of 'productsInCart'. */
  let itemsInCart = localStorage.getItem("productsInCart");
  /* Converting the itemsInCart variable from a string to a JavaScript object. */
  itemsInCart = JSON.parse(itemsInCart);
  /* Setting a variable to be equal to the value in local storage that is assigned to the 'totalCostofItems' key. */
  let cost = localStorage.getItem("totalCostofItems");

  /* Creating a for loop to loop through all of the elements within the 'removeButtons' variable
     and add a click event to each element. */
  for (let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener("click", () => {
      /* Setting the nameOfSelectedproduct variable to the specific delete option that the user has selected and extracting 
         the content from the parentElement and am using the trim() method to remove whitespace from both sides of the string
         and am converting the output received to be all lowercase. */
      nameOfSelectedproduct = removeButtons[i].parentElement.textContent
        .trim()
        .toLocaleLowerCase()
        /* Using regex (Regular Expressions) to search globally for spaces and to then remove the spaces. */
        .replace(/ /g, "");

      /* Setting localstorage with the key of 'itemsInCart' to be equal to the amountOfProducts variable minus the 
         amount of items there are of that product in the cart. */
      localStorage.setItem(
        "itemsInCart",
        amountOfProducts - itemsInCart[nameOfSelectedproduct].productIsInCart
      );

      /* Setting localstorage with the key of 'totalCostofItems' to be equal to the 'cost' variable minus price of the product multiplied by the quantity. */
      localStorage.setItem(
        "totalCostofItems",
        cost -
          itemsInCart[nameOfSelectedproduct].productPrice *
            itemsInCart[nameOfSelectedproduct].productIsInCart
      );

      /* Removing the product name from the itemsInCart variable which stores it in local storage and then I am updating the 
         local storage and am converting from a JavaScript object to a string. */
      delete itemsInCart[nameOfSelectedproduct];
      localStorage.setItem("productsInCart", JSON.stringify(itemsInCart));

      /* Calling the displayItemsInCart and checkCartItems functions. */
      displayItemsInCart();
      checkCartItems();
    });
  }
}

/* =================================================================================================================== */

/* Creating a function to update the quantity of the products in the shopping cart. */

function updateProductQuantity() {
  /* Declaring 2 variables and am targeting the HTML elements with the 'remove' and 'add' classes. */
  let removeItems = document.querySelectorAll(".remove");
  let addItems = document.querySelectorAll(".add");
  /* Declaring a variable that will store the amount of times an item has been added to the cart. */
  let productQuantity = 0;

  /* Delcaring a variable to store the value of the product that's quantity is being increased or decreased.*/
  let myProduct = "";

  /* Declaring a variable to store the values from local storage that have the 'productsInCart' key
     amd I am converting it from a string into a JavaScript object. */
  let productsInCart = localStorage.getItem("productsInCart");
  productsInCart = JSON.parse(productsInCart);
  console.log(productsInCart);

  /* Creating for loops to add click events to the ion-icons with the 'remove' and 'add' classes. */
  for (let i = 0; i < removeItems.length; i++) {
    removeItems[i].addEventListener("click", () => {
      productQuantity = removeItems[i].parentElement.querySelector(
        ".chosenProductQuantitySpan"
      ).textContent;
      console.log(productQuantity);
      /* Setting the myProduct variable to be equal to the text content within the 'span' element which is two divs up in the  DOM, I am using 'parentElement.previousElementSibling.previousElementSibling' to access the element (span) that contains the name of the product. I am also converting the result to lowercase and am removing the spaces between the words in the product name using JavaScript Regular Expressions and am also getting rid of any spaces before and after the result using the .trim() method.*/
      myProduct = removeItems[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(myProduct);

      /* Using an if statement to check if the product quantity is greater than 1, if it is not, the user cannot decrease
         the quantity any further. */

      if (productsInCart[myProduct].productIsInCart > 1) {
        /* Updating the productIsInCart attribute linked to the product. */
        productsInCart[myProduct].productIsInCart -= 1;
        /* calling the amountOfItemsIncart and totalCost functions and am passing in the "remove" action listed in the function. */
        amountOfItemsIncart(productsInCart[myProduct], "remove");
        totalCost(productsInCart[myProduct], "remove");
        /* Updating the local storage with the key 'productsInCart' to contain the values linked to the 'productsInCart' variable. */
        localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
        /* Calling the displayItemsInCart function in order to re-render the web page.*/
        displayItemsInCart();
      }
    });
  }
  for (let i = 0; i < addItems.length; i++) {
    addItems[i].addEventListener("click", () => {
      productQuantity = addItems[i].parentElement.querySelector(
        ".chosenProductQuantitySpan"
      ).textContent;
      console.log(productQuantity);

      /* Setting the myProduct variable to be equal to the text content within the 'span' element which is two divs up in the  DOM, I am using 'parentElement.previousElementSibling.previousElementSibling' to access the element (span) that contains the name of the product. I am also converting the result to lowercase and am removing the spaces between the words in the product name using JavaScript Regular Expressions and am also getting rid of any spaces before and after the result using the .trim() method.*/
      myProduct = addItems[
        i
      ].parentElement.previousElementSibling.previousElementSibling
        .querySelector("span")
        .textContent.toLocaleLowerCase()
        .replace(/ /g, "")
        .trim();
      console.log(myProduct);

      /* Updating the productIsInCart attribute linked to the product. */
      productsInCart[myProduct].productIsInCart += 1;
      /* calling the amountOfItemsIncart and totalCost functions and am passing in the "remove" action listed in the function. */
      amountOfItemsIncart(productsInCart[myProduct]);
      totalCost(productsInCart[myProduct]);
      /* Updating the local storage with the key 'productsInCart' to contain the values linked to the 'productsInCart' variable. */
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      /* Calling the displayItemsInCart function in order to re-render the web page.*/
      displayItemsInCart();
    });
  }
}

/* =================================================================================================================== */

/* Calling the two functions below when the page loads. */

checkCartItems();
displayItemsInCart();

/* =================================================================================================================== */

/* Writing code to display an alert and to generate a random order number. */

let confirmOrderButton = document.getElementById("confirmOrderButton");

/* Creating a function to generate a random number which will be given to the customer as their order number. */

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/* Adding an onlick event listener to the confirmOrderButton variable to display an alert with a randomly generated number
   which is the order number. */

confirmOrderButton.addEventListener("click", () => {
  alert(
    "Thanks you, your order was successful.  Your order number is: " +
      randomNumber(100, 1000)
  );
});

/* =================================================================================================================== */

/* jQuery section. */

/* Creating a jQuery function to hide the forms on the catalogue. */
$(document).ready(function () {
  $(".hideFormsButton").click(function () {
    $(
      ".discountCouponSection, .collectionOrDeliverySection, .deliveryOptionsSection"
    ).hide();
  });

  /* Creating a jQuery function to hide the forms on the catalogue. */
  $(".showFormsButton").click(function () {
    $(
      ".discountCouponSection, .collectionOrDeliverySection, .deliveryOptionsSection"
    ).show();
  });

  /* Creating a jQuery function to display the dropdown menu on the cart page. */
  $(".dropDownNaviagtionMenuSectionButton").click(function () {
    $(".dropDownNaviagtionMenuUnorderedList").show(800);
  });
  /* Creating a jQuery function to hide the dropdown menu on the cart page. */
  $(".dropDownNaviagtionMenuSectionHideButton").click(function () {
    $(".dropDownNaviagtionMenuUnorderedList").hide(800);
  });
  /* Creating a jQuery function to increase the size of the section element with the 'deliveryOptionsSection' class name
     and the form element with the class name "deliveryOptionForm" when a user clicks on the 'animateButton' on the cart page. */
  $(".animateButton").click(function () {
    $(".deliveryOptionsSection, .deliveryOptionForm").animate({
      width: "900px",
    });
  });
  /* Creating a jQuery function to set the size of the section element with the 'deliveryOptionsSection' class name
     and the form element with the class name "deliveryOptionForm" back to its original size when a user clicks on the 
     'reverseAnimation' button on the cart page. */
  $(".reverseAnimation").click(function () {
    $(".deliveryOptionsSection, .deliveryOptionForm").animate({
      width: "600px",
    });
  });
  /* Creating a jQuery function which applies chained effects to the 'confirmOrderButton' on the cart page. */
  $("#confirmOrderButton")
    .css("background-color", "orangered")
    .css("color", "black")
    .slideUp(1300)
    .slideDown(1300);
});

/* =================================================================================================================== */

// References used for this task:

/* 
  Reference 1:
  ===================================================================
  Reference used:   JavaScript Shopping Cart Tutorial - Part 1/5 (Youtube video)
  Date published:   Jan 13, 2020
  Video created by: Telmo Sampaio 
  Link to video: https://www.youtube.com/watch?v=B20Getj_Zk4&t=1s
*/

/* 
  Reference 2:
  ===================================================================
  Reference used:   JavaScript Shopping Cart Tutorial - Part 2/5 (Youtube video)
  Date published:   Jan 13, 2020
  Video created by: Telmo Sampaio  
  Link to video: https://www.youtube.com/watch?v=PoTGs38DR9E 

*/

/* 
  Reference 3:
  ===================================================================
  Reference used:   JavaScript Shopping Cart Tutorial - Part 3/5 (Youtube video)
  Date published:   Jan 129, 2020
  Video created by: Telmo Sampaio  
  Link to video: https://www.youtube.com/watch?v=tEAl7L62GEw
*/

/* 
  Reference 4:
  ===================================================================
  Reference used:   JavaScript Shopping Cart Tutorial - Part 4/5 (Youtube video)
  Date published:   Jan 14, 2020
  Video created by: Telmo Sampaio 
  Link to video:  https://www.youtube.com/watch?v=QNXQfdgIXLw&t=154s
*/

/* Reference 5:
   ===================================================================
   Reference used:   JavaScript Shopping Cart Tutorial - Part 5/5 (Youtube video)
   Date published:   Jan 14, 2020
   Video created by: Telmo Sampaio
   Link to video:   https://www.youtube.com/watch?v=IY5UN82FZ2Q&t=545s 
*/

/* Reference 6:
   ===================================================================
   Reference used:   https://telmoacademy.com/
   Video created by: Telmo Sampaio
   Link to video:   https://telmoacademy.com/courses/enrolled/927257
*/
