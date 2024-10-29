const mobileMenuButton = document.querySelector(".mobile-menu");
const navList = document.querySelector("nav ul");
const navItems = document.querySelectorAll("nav ul li a");
const backToTop = document.querySelector("#backTop");

backToTop.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

window.onscroll = function (){scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector('header').style.backdropFilter = "blur(10px)";
        if (window.matchMedia("(max-width: 400px)").matches){
            document.querySelector('header .logo h1').style.fontSize = "18px";
        } else {
            document.querySelector('header .logo h1').style.fontSize = "22px";
        } 
        document.querySelector('header').style.backgroundColor = "#05590c5c";
        document.querySelector('header').style.height = "100px";
    } else {
        document.querySelector('header').style.backdropFilter = "none";
        if (window.matchMedia("(max-width: 400px)").matches){
            document.querySelector('header .logo h1').style.fontSize = "22px";
        } else {
            document.querySelector('header .logo h1').style.fontSize = "32px";
        } 
        document.querySelector('header').style.backgroundColor = "transparent";
        document.querySelector('header').style.height = "100px";
    }
}

const toggleMenu = () => {
    navList.classList.toggle("open");
}

mobileMenuButton.addEventListener("click", toggleMenu);

// if the screen width is mobile size, close the menu options on click
for (let navItem of navItems) {
    navItem.addEventListener("click", function() {
        if (window.matchMedia("(max-width: 600px)").matches) {
            navList.classList.toggle("open");
        }
    })
}

// Function to check if the screen width is mobile size
function checkScreenSize() {
    if (window.matchMedia("(max-width: 600px)").matches) {
        navList.classList.add('responsive'); // Add the responsive class only for small screens
    } else {
        navList.classList.remove('responsive'); // Remove it when the screen size is larger
    }
}

// Add an event listener to handle screen resize
window.addEventListener('resize', checkScreenSize);

// Initial check when the page loads
checkScreenSize();