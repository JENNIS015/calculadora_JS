$(document).ready(function() {
    $('a[class="nav-link"]').bind('click', function(e) {
     e.preventDefault(); 
        
     var target = $(this).attr("href"); //Get the target
    
     $('html, body').stop().animate({ scrollTop: $(target).offset().top}, 1000, function() {
          location.hash = target + 300; 
     });
             
     return false;
    });
 });


const shoppingCart = (function() {
    let cart = [];

    function Item(name, price, count) {
        this.name = name;
        this.price = price;
        this.count = count;

    }

    function saveCart() {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    function loadCart() {
        cart = JSON.parse(localStorage.getItem("shoppingCart"));
        if (cart === null) {
            cart = []
        }
    }

    loadCart();

    var obj = {};
    obj.addItemToCart = function(name, price, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count += count;
                saveCart();
                return;
            }
        }

        var item = new Item(name, price, count);
        cart.push(item);
        saveCart();
    };

    obj.setCountForItem = function(name, count) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart[i].count = count;
                break;
            }
        }
        saveCart();
    };

    obj.removeItemFromCart = function(name) { 
        for (var i in cart) {
            if (cart[i].name === name) { 
                cart[i].count--; 
                if (cart[i].count === 0) {
                    cart.splice(i, 1);
                }
                break;
            }
        }
        saveCart();
    };

    obj.removeItemFromCartAll = function(name) {
        for (var i in cart) {
            if (cart[i].name === name) {
                cart.splice(i, 1);
                break;
            }
        }
        saveCart();
    };

    obj.clearCart = function() {
        cart = [];
        saveCart();
    };

    obj.countCart = function() { 
        var totalCount = 0;
        for (var i in cart) {
            totalCount += cart[i].count;
        }

        return totalCount;
    };

    obj.totalCart = function() {
        var totalCost = 0;
        for (var i in cart) {
            totalCost += cart[i].price * cart[i].count;
        }
        return totalCost.toFixed(2);
    };

    obj.listCart = function() { 
        var cartCopy = [];
        for (var i in cart) {
            var item = cart[i];
            var itemCopy = {};
            for (var p in item) {
                itemCopy[p] = item[p];
            }
            itemCopy.total = (item.price * item.count).toFixed(2);
            cartCopy.push(itemCopy);
        }
        return cartCopy;
    };

    return obj;
})();

    $(".pricing-button").click(function(event) {
        event.preventDefault();
        var name = $(this).attr("data-name");
        var price = Number($(this).attr("data-price"));
        shoppingCart.addItemToCart(name, price, 1);
        displayCart();
        setTimeout(function() {
            window.location = 'pages/checkout.html';
        },100);

        cartWrapper.removeClass('empty');
    });
    $("#clear-cart").click(function(event) {
        cartWrapper.removeClass('cart-open');
        cartWrapper.addClass('empty');
        shoppingCart.clearCart();
        displayCart();
    });
function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += `<li class='product'>
            <div class='product-details'>
                <h3>${cartArray[i].name}</h3>
                <span class='price'>${cartArray[i].total} $ </span>
                <div class='actions'>
                    <div class="quantity">
                    <label for="cd-product-3">Cantidad: </label>  <span>${cartArray[i].count}</span> - 
                    <a class='delete-item' data-name='${cartArray[i].name}'> Borrar </a>  
                    </div>
                </div>
            </div>
            </li>`;
    }
    $("#show-cart").html(output);
    $("#count-cart").html(shoppingCart.countCart());
    $("#total-cart").html(shoppingCart.totalCart());
    $("#total-resumen").html(shoppingCart.totalCart());
}
   $("#show-cart").on("click", ".delete-item", function(event) {
        event.preventDefault();
        var name = $(this).attr("data-name");
        shoppingCart.removeItemFromCartAll(name);
        displayCart();
       
    });

displayCart();


//modo oscuro
const toggleBtn = document.querySelector('[data-toggle="theme"]');
const textToggleBtn = document.querySelector('.switch__label');


if (localStorage.getItem('data-theme', 'dark')) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.querySelector('[data-toggle="theme"]').checked = true;
  textToggleBtn.innerText = 'Modo Claro';
}

toggleBtn.addEventListener('click', (e) => {
  if (document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.removeAttribute('data-theme');
    textToggleBtn.innerText = 'Activar Modo Oscuro';

    localStorage.removeItem('data-theme', 'dark');
  } else {

    document.documentElement.setAttribute('data-theme', 'dark');
    textToggleBtn.innerText = 'Desacticar modo oscuro';
    localStorage.setItem('data-theme', 'dark');
  }
});



