class Order{
    constructor(pancakeType, toppings, extras, deliveryType, customerName, totalPrice){
        this.pancakeType = pancakeType;
        this.toppings = toppings; // []
        this.extras = extras; // []
        this.deliveryType = deliveryType;
        this.customerName = customerName;
        this.totalPrice = totalPrice;
    }
}

const orders = [];

const pancakeType = document.querySelector("#type")
const checkBoxes = document.querySelectorAll('input[type="checkbox"]')
const delivery = document.getElementById("delivery")
const customerName = document.getElementById("customerName")
const button = document.getElementById("seeOrder")
const deliveryMethod = document.querySelectorAll('input [name="que"]:checked').value;



function updatePrice(price) {
    const priceBanner = document.getElementsByClassName("price-banner")[0]
    const totalPrice = document.getElementById("totalPrice")
    priceBanner.textContent = "€" + price
    totalPrice.textContent = "€" + price

    const priceBannerAnimation = [
        { transform: "scale(1)" },
        { transform: "scale(1.5)" },
        { transform: "scale(1)" }
    ];

    const priceBannerTiming = {
        duration: 500,
        iteration: 1,
    };
    
    priceBanner.animate(priceBannerAnimation, priceBannerTiming);
}

let checkbox;
function calculatePrice(){
    let sum = Number(pancakeType.value)
    
    for (checkbox of checkBoxes){
        if (checkbox.checked){
            sum += Number(checkbox.value)
        }
    }
    if (delivery.checked){
        sum += Number(delivery.value)
    }
    updatePrice(sum) 
} 



function currentOrderDetails(){
    
    const orderDetails = document.getElementById("customer");
    
    const toppings = [];
    const extras = []
   
    for (let j = 0; j < checkBoxes.length; j++){
        if (checkBoxes[j].checked && checkBoxes[j].name == "toppings"){
            toppings.push(checkBoxes[j].labels[0].textContent);
        }
        if (checkBoxes[j].checked && checkBoxes[j].name == "extras"){
            extras.push(checkBoxes[j].labels[0].textContent);
        }
    }

    const deliveryType = document.getElementsByName("que");
    let deliveryTypeChoosen = "";
    for (let i = 0; i < deliveryType.length; i++){
        if (deliveryType[i].checked){
            deliveryTypeChoosen = deliveryType[i].labels[0].textContent;
        }
    }
    const newOrder = new Order(
        pancakeType.selectedOptions[0].innerText,
        toppings,
        extras,
        deliveryTypeChoosen,
        customerName.value,
        document.querySelectorAll("#totalPrice")[0].textContent)

    orders.push(newOrder);

    let paraText = "<p>Name: " + newOrder.customerName + "</p>" +
    "<p>Pancake type: " + newOrder.pancakeType +  "</p>" +
    "<p>Toppings: " + newOrder.toppings.join(", ") + "</p>" +
    "<p>Extras: " + newOrder.extras.join(", ") +  "</p>" +
    "<p>Delivery method: " + newOrder.deliveryType + "</p>" +
     "<h4>Total price: " + newOrder.totalPrice + "</h4>"


    
    orderDetails.innerHTML = paraText;             
}


pancakeType.addEventListener("change", calculatePrice)

for (let checkbox of checkBoxes){
    checkbox.addEventListener("change", calculatePrice)
}

delivery.addEventListener("change", calculatePrice)

button.addEventListener("click", currentOrderDetails)
