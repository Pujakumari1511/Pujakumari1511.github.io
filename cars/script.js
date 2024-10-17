'use strict';

const CARS_KEY = 'cars';

class Car {
    constructor(licensePlate, maker, model, currentOwner, price, color, year){
        this.licensePlate = licensePlate;
        this.maker = maker;
        this.model = model;
        this.currentOwner = currentOwner;
        this.price = price;
        this.color = color;
        this.year = year;
        this.discountedPrice = this.calculateDiscount();
    }

    calculateDiscount(){
         
        let carDiscountedPrice;
        let currentYear = new Date().getFullYear();
        let carsAge = currentYear - this.year;
        
        if (carsAge > 10){
            carDiscountedPrice = price.value.trim() * 0.85;  
        } else {
            carDiscountedPrice = "N/A"
        } 
        return carDiscountedPrice;
    }   
}


class CarTable{
    constructor(carList){
        this.carList = carList;
        this.#updateTable();
    }
    
    addCar(newCar){
        try {
            if (this.findCarByLicensePlate(newCar.licensePlate)) {
                throw new Error(`The license plate ${licensePlate.value} already exist in the records`);
            }
            this.carList.push(newCar);
            this.#saveCars();
            this.#updateTable();
            this.#displayMessage("Car added successfully!!");
        } catch(error) {
            this.#displayMessage(error.message, "error");
        }
    }

    findCarByLicensePlate(licensePlate) {
        return this.carList.find(car => car.licensePlate == licensePlate);
    }

    #saveCars(){
        localStorage.setItem(CARS_KEY, JSON.stringify(this.carList));
    }

    #deleteCar(index) {
        this.carList.splice(index, 1);
        this.#saveCars();
        this.#updateTable();
        this.#displayMessage("Car deleted successfully!!");
    }

    #updateTable(){
        const table = document.querySelector("#carDatabase");
        table.innerHTML = table.rows[0].innerHTML;
    
        this.carList.forEach((car, index) => {
            const row = table.insertRow(-1);
            Object.keys(car).forEach(key => {
                const cell = row.insertCell(-1);
                if (key == "color"){
                    const colorBox = document.createElement("div");
                    colorBox.classList.add("color-box");
                    colorBox.style.background = car[key];
                    cell.appendChild(colorBox);
                } else {
                    cell.textContent = key == "price" || (key == "discountedPrice" && car[key] != "N/A")
                    ? "€" + Number(car[key]).toFixed(2) 
                    : car[key];
                }
            });
    
            const deleteButton = document.createElement("span");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => this.#deleteCar(index));
            row.insertCell(-1).appendChild(deleteButton);
        })
    }

    #displayMessage = (message, type = "success") => {
        const messageElement = document.querySelector("#message");
        messageElement.textContent = message;
        messageElement.className = type;
        setTimeout(() => {
            messageElement.textContent = "";
            messageElement.className = "";
        }, 3000);
    }
}

// logic starts here

const carTable = new CarTable(JSON.parse(localStorage.getItem(CARS_KEY)) || []);

// add options to year input field in add car form
const selectYear = document.getElementById("year");
for (let year = new Date().getFullYear(); year >= 1886; year--) {
    selectYear.options.add(new Option(year, year))
}

function userInput(e){
    e.preventDefault();
    const licensePlate = document.getElementById("licensePlate")
    const maker = document.getElementById("maker")
    const model = document.getElementById("model")
    const currentOwner = document.getElementById("currentOwner")
    const price = document.getElementById("price")
    const color = document.getElementById("color")
    const year = document.getElementById("year")

    const newCar = new Car(licensePlate.value.trim(),
        maker.value.trim(),
        model.value.trim(),
        currentOwner.value.trim(),
        price.value.trim(),
        color.value,
        year.value);

    carTable.addCar(newCar);
    addCarForm.reset();     
};

const addCarForm = document.getElementById("addcarform");
addCarForm.addEventListener("submit", userInput)

// Search license number

function searchLicensehNumber(e){
    e.preventDefault();
    const licenseNumber = document.getElementById("licenseNumber").value.trim();
    const searchResult = document.getElementById("search-result");
    const car = carTable.findCarByLicensePlate(licenseNumber);
    if (car) {
        searchResult.innerHTML = "<p> License number: " + licenseNumber + "</p>" +
        "<p> Maker: " + car.maker + "</p>" +
        "<p> Model: " + car.model + "</p>" +
        "<p> Owner: " + car.currentOwner + "</p>" +
        "<p> Original price: "+ "€" + car.price + "</p>" + 
        "<p> Discounted price: " + "€"+ car.discountedPrice + "</p>"
    } else {
        searchResult.innerHTML = `No car found with the license plate ${licenseNumber}.`
    }
    searchCarNumber.reset();
}

const searchCarNumber = document.getElementById("searchCarNumber");
searchCarNumber.addEventListener("submit", searchLicensehNumber);


